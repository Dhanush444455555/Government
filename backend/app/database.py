import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings
import pymysql

logger = logging.getLogger(__name__)

# Ensure MySQL Database exists before connecting
def init_mysql_db():
    try:
        conn = pymysql.connect(
            host=settings.MYSQL_HOST,
            user=settings.MYSQL_USER,
            password=settings.MYSQL_PASSWORD,
            port=int(settings.MYSQL_PORT)
        )
        with conn.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {settings.MYSQL_DATABASE} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        conn.commit()
        conn.close()
        logger.info(f"Verified/Created MySQL Database '{settings.MYSQL_DATABASE}'")
        return True
    except Exception as e:
        logger.warning(f"Could not automatically create/connect MySQL DB: {e}")
        return False

init_mysql_db()

try:
    engine = create_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        pool_pre_ping=True,
        pool_recycle=3600
    )
    # Test connection
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    logger.info("Successfully connected to MySQL via SQLAlchemy.")
except Exception as e:
    logger.error(f"MySQL connection failed ({e}). Falling back to local high-performance SQLite engine for uninterrupted operation.")
    import os
    import shutil
    db_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    seed_db = os.path.join(db_dir, "government_db.sqlite3")

    if os.environ.get("VERCEL"):
        tmp_db = "/tmp/government_db.sqlite3"
        if os.path.exists(seed_db) and not os.path.exists(tmp_db):
            try:
                shutil.copy(seed_db, tmp_db)
            except Exception as copy_err:
                logger.warning(f"Could not copy seed db to /tmp: {copy_err}")
        sqlite_url = f"sqlite:///{tmp_db}"
    else:
        sqlite_url = f"sqlite:///{seed_db}"

    engine = create_engine(
        sqlite_url,
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
