import json
from backend.app.database import SessionLocal, engine, Base
import backend.app.models
from backend.app.models.user import User
from backend.app.models.exam import ExamCategory, Exam, StudyMaterial, PreviousPaper
from backend.app.models.mock_test import MockTest
from backend.app.models.job import Job
from backend.app.models.dsa import DsaProblem
from backend.app.models.interview import InterviewQuestion, AptitudePractice
from backend.app.models.core_cs import CoreCSConcept
from backend.app.core.security import get_password_hash
from backend.seed_upsc import seed_upsc_data
from backend.seed_resources import seed_resources

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Default User
    if not db.query(User).filter(User.email == "student@government.in").first():
        default_user = User(
            email="student@government.in",
            hashed_password=get_password_hash("password123"),
            name="Aspirant Candidate",
            target_exam="Civil Services (UPSC)",
            education="B.Tech Computer Science / B.A. Administration",
            study_hours_per_day=6,
            gpa="8.2",
            attempts=1
        )
        db.add(default_user)
        db.commit()

    # Seed Exam Categories
    if db.query(ExamCategory).count() == 0:
        categories = [
            ExamCategory(name="Civil Services", description="UPSC CSE, State PSC for IAS, IPS, IRS, and administrative services.", icon="government", color="blue"),
            ExamCategory(name="Banking", description="IBPS PO, SBI PO, RBI Grade B, and Clerk recruitment examinations.", icon="bank", color="emerald"),
            ExamCategory(name="Railways", description="RRB NTPC, RRB JE, and Group D examinations for Indian Railways.", icon="train", color="amber"),
            ExamCategory(name="Defense", description="NDA, CDS, AFCAT, and CAPF for Indian Armed Forces.", icon="shield", color="rose"),
            ExamCategory(name="Staff Selection", description="SSC CGL, CHSL, MTS for Central Government Ministries.", icon="briefcase", color="purple"),
            ExamCategory(name="Teaching", description="CTET, UGC NET, and State TET for certified education careers.", icon="book", color="indigo"),
        ]
        db.add_all(categories)
        db.commit()

        # Seed Exams
        cat_civil = db.query(ExamCategory).filter(ExamCategory.name == "Civil Services").first()
        cat_bank = db.query(ExamCategory).filter(ExamCategory.name == "Banking").first()
        cat_rrb = db.query(ExamCategory).filter(ExamCategory.name == "Railways").first()
        cat_ssc = db.query(ExamCategory).filter(ExamCategory.name == "Staff Selection").first()

        exams = [
            Exam(
                title="UPSC Civil Services Examination (CSE)",
                description="The premier civil services exam in India for recruitment to IAS, IPS, IFS, and Central Services Group A & B.",
                category_id=cat_civil.id,
                exam_type="Government",
                level="National",
                duration=120,
                total_marks=200,
                passing_marks=105,
                eligibility="Graduation in any discipline from a recognized University. Age: 21-32 years.",
                pattern="Prelims (Paper 1 GS + Paper 2 CSAT) -> Mains (9 Descriptive Papers) -> Personality Test Interview.",
                syllabus="General Studies: Indian Polity, Modern History, Geography, Indian Economy, Ecology & Environment, International Relations, CSAT Aptitude.",
                official_website="https://upsc.gov.in"
            ),
            Exam(
                title="IBPS Probationary Officer (PO)",
                description="Common recruitment process for Probationary Officers and Management Trainees across Participating Public Sector Banks.",
                category_id=cat_bank.id,
                exam_type="Banking",
                level="National",
                duration=60,
                total_marks=100,
                passing_marks=55,
                eligibility="Degree (Graduation) in any discipline. Age limit: 20 to 30 years.",
                pattern="Prelims (English, Quant, Reasoning) -> Mains (Data Analysis, Reasoning, Economy, English) -> Interview.",
                syllabus="Quantitative Aptitude, Data Interpretation, Logical Reasoning, Banking & Financial Awareness, English Language.",
                official_website="https://ibps.in"
            ),
            Exam(
                title="SSC Combined Graduate Level (CGL)",
                description="Recruitment to Group B and Group C posts in various Ministries, Departments, and Organizations of the Government of India.",
                category_id=cat_ssc.id,
                exam_type="Government",
                level="National",
                duration=60,
                total_marks=200,
                passing_marks=130,
                eligibility="Bachelor's degree from a recognized university. Age: 18-32 years.",
                pattern="Tier I (Computer Based Exam: 100 MCQs) -> Tier II (Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge).",
                syllabus="Quantitative Aptitude, General Intelligence & Reasoning, English Comprehension, General Awareness & Current Affairs.",
                official_website="https://ssc.gov.in"
            ),
            Exam(
                title="RRB Non-Technical Popular Categories (NTPC)",
                description="Recruitment for Station Master, Goods Train Manager, Senior Clerk, and Commercial Apprentice across 21 Railway Recruitment Boards.",
                category_id=cat_rrb.id,
                exam_type="Railways",
                level="National",
                duration=90,
                total_marks=100,
                passing_marks=40,
                eligibility="12th Pass or Graduate based on specific pay level post.",
                pattern="CBT Stage 1 (Screening) -> CBT Stage 2 -> Typing / Computer Based Aptitude Test -> Document Verification.",
                syllabus="General Awareness (40 marks), Mathematics (30 marks), General Intelligence and Reasoning (30 marks).",
                official_website="https://indianrailways.gov.in"
            )
        ]
        db.add_all(exams)
        db.commit()

        # Seed Study Materials
        upsc_exam = db.query(Exam).filter(Exam.title.ilike("%UPSC%")).first()
        materials = [
            StudyMaterial(
                title="Indian Polity: Preamble and Fundamental Rights (Articles 12-35)",
                description="Comprehensive notes on Part III of the Constitution, writ jurisdictions (Habeas Corpus, Mandamus), and landmark judgments.",
                subject="Indian Polity",
                chapter="Constitutional Framework",
                difficulty="Medium",
                type="notes",
                content="### Key Points on Fundamental Rights\n- **Article 14**: Equality before law and equal protection of laws.\n- **Article 19**: Six freedoms guaranteed to citizens.\n- **Article 21**: Protection of life and personal liberty (Puttaswamy privacy ruling).\n- **Article 32**: Right to Constitutional Remedies - Heart and Soul of Constitution (Dr. B.R. Ambedkar).",
                exam_id=upsc_exam.id
            ),
            StudyMaterial(
                title="Modern Indian History: Freedom Struggle (1857-1947)",
                description="Chronology of Revolt of 1857, Indian National Congress formation, Non-Cooperation, Civil Disobedience, and Quit India Movement.",
                subject="History",
                chapter="Modern India",
                difficulty="Medium",
                type="notes",
                content="### Major Movements Timeline\n- 1857: First War of Independence\n- 1885: INC established in Bombay\n- 1905: Swadeshi Movement (Anti-Partition of Bengal)\n- 1920: Non-Cooperation Movement launched by Mahatma Gandhi\n- 1930: Dandi March and Civil Disobedience\n- 1942: Quit India Resolution ('Do or Die')",
                exam_id=upsc_exam.id
            )
        ]
        db.add_all(materials)

        # Seed Mock Test
        mock_questions = [
            {
                "question": "Under which Article of the Indian Constitution is the right to constitutional remedies provided?",
                "options": ["A) Article 19", "B) Article 21", "C) Article 32", "D) Article 44"],
                "correct_answer": "C",
                "explanation": "Article 32 gives the right to individuals to move to the Supreme Court to seek justice when they feel their Fundamental Rights have been unduly deprived."
            },
            {
                "question": "Which Viceroy of India presided over the Partition of Bengal in 1905?",
                "options": ["A) Lord Curzon", "B) Lord Dalhousie", "C) Lord Canning", "D) Lord Ripon"],
                "correct_answer": "A",
                "explanation": "Lord Curzon announced the partition of Bengal on 19 July 1905, leading to the nationwide Swadeshi Movement."
            },
            {
                "question": "What is the monetary policy stance of the Reserve Bank of India primarily targeted at maintaining?",
                "options": ["A) Exchange rate parity", "B) Price stability with growth", "C) Stock market indices", "D) Commercial bank profits"],
                "correct_answer": "B",
                "explanation": "The primary objective of the RBI Monetary Policy Committee is to maintain price stability (4% +/- 2% CPI target) while keeping in mind the objective of growth."
            },
            {
                "question": "A train 180 meters long is running at 72 km/h. How much time will it take to pass a telegraph post?",
                "options": ["A) 7 seconds", "B) 9 seconds", "C) 12 seconds", "D) 15 seconds"],
                "correct_answer": "B",
                "explanation": "Speed = 72 * (5/18) = 20 m/s. Time = Distance / Speed = 180 / 20 = 9 seconds."
            }
        ]
        test = MockTest(
            title="UPSC Prelims General Studies Comprehensive Mock 1",
            description="All India level standard mock test covering Polity, Modern History, Economy, and CSAT Quant.",
            exam_id=upsc_exam.id,
            duration_minutes=30,
            total_marks=100,
            questions_json=json.dumps(mock_questions)
        )
        db.add(test)
        db.commit()

    # Seed Job Listings
    if db.query(Job).count() == 0:
        jobs = [
            Job(
                title="Assistant Section Officer (Central Secretariat Service)",
                organization="Ministry of Personnel, Public Grievances and Pensions",
                location="New Delhi",
                job_type="Government",
                category="Civil Services / SSC",
                salary_range="Rs. 44,900 - 1,42,400 (Level 7)",
                description="Assisting in policy formulation, file disposal, parliamentary questions handling, and inter-ministerial coordination.",
                eligibility="Bachelor's degree from recognized university. Age: 20-30 years.",
                deadline="2026-12-15"
            ),
            Job(
                title="Probationary Officer (Scale I Cadre)",
                organization="State Bank of India (SBI)",
                location="Pan India",
                job_type="Government",
                category="Banking",
                salary_range="Rs. 65,000 - 82,000 / month gross",
                description="Branch banking operations, credit appraisal, customer relationship management, and financial audit.",
                eligibility="Graduation in any discipline. Age: 21-30 years.",
                deadline="2026-11-30"
            ),
            Job(
                title="Scientist / Technical Officer 'B'",
                organization="National Informatics Centre (NIC)",
                location="Bengaluru / New Delhi",
                job_type="PSU",
                category="Engineering & IT",
                salary_range="Rs. 56,100 - 1,77,500 (Level 10)",
                description="Design, develop, and maintain e-Governance software systems, database infrastructure, and API gateways.",
                eligibility="B.E / B.Tech in CSE / IT / ECE with minimum 60% marks.",
                deadline="2026-12-20"
            ),
            Job(
                title="Content Research Assistant (Part-Time)",
                organization="Government Exam Portal Initiative",
                location="Remote / Hybrid",
                job_type="Part-Time",
                category="Education & Research",
                salary_range="Rs. 18,000 - 25,000 / month",
                description="Curating previous year questions, preparing solution explanations, and validating syllabus updates.",
                eligibility="Undergraduate / Postgraduate student with strong analytical skills.",
                deadline="2026-11-28"
            )
        ]
        db.add_all(jobs)
        db.commit()

    # Seed DSA Problems for All 14 Topics with C++ Solutions
    if db.query(DsaProblem).count() == 0:
        dsa_data = [
            # 1. Arrays and Strings
            DsaProblem(
                topic="Arrays and Strings",
                title="Two Sum Problem",
                difficulty="Easy",
                description="Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
                constraints="2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9",
                examples="Input: nums = [2,7,11,15], target = 9 -> Output: [0,1]",
                cpp_solution="""#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(N)",
                explanation="Utilize a hash map to store each visited element and its index, querying for target - nums[i] in O(1) average time."
            ),
            # 2. Two Pointers
            DsaProblem(
                topic="Two Pointers",
                title="Valid Palindrome",
                difficulty="Easy",
                description="A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.",
                constraints="1 <= s.length <= 2 * 10^5",
                examples="Input: s = \"A man, a plan, a canal: Panama\" -> Output: true",
                cpp_solution="""#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(1)",
                explanation="Use two pointers from left and right boundaries moving inwards, skipping non-alphanumeric characters."
            ),
            # 3. Sliding Window
            DsaProblem(
                topic="Sliding Window",
                title="Longest Substring Without Repeating Characters",
                difficulty="Medium",
                description="Given a string `s`, find the length of the longest substring without duplicate characters.",
                constraints="0 <= s.length <= 5 * 10^4",
                examples="Input: s = \"abcabcbb\" -> Output: 3 (\"abc\")",
                cpp_solution="""#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(256, -1);
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (lastIndex[s[right]] >= left) {
                left = lastIndex[s[right]] + 1;
            }
            lastIndex[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(min(N, M))",
                explanation="Maintain a variable-size sliding window [left, right], updating left boundary to skip repeated characters."
            ),
            # 4. Binary Search
            DsaProblem(
                topic="Binary Search",
                title="Search in Rotated Sorted Array",
                difficulty="Medium",
                description="Given integer array `nums` sorted in ascending order with distinct values and rotated at an unknown pivot, search for `target`.",
                constraints="1 <= nums.length <= 5000",
                examples="Input: nums = [4,5,6,7,0,1,2], target = 0 -> Output: 4",
                cpp_solution="""#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid])
                    high = mid - 1;
                else
                    low = mid + 1;
            } else { // Right half is sorted
                if (nums[mid] < target && target <= nums[high])
                    low = mid + 1;
                else
                    high = mid - 1;
            }
        }
        return -1;
    }
};""",
                time_complexity="O(log N)",
                space_complexity="O(1)",
                explanation="One half of the rotated array is always strictly sorted. Determine which half is sorted and check if target lies within its bounds."
            ),
            # 5. Sorting
            DsaProblem(
                topic="Sorting",
                title="Merge Intervals",
                difficulty="Medium",
                description="Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals.",
                constraints="1 <= intervals.length <= 10^4",
                examples="Input: intervals = [[1,3],[2,6],[8,10],[15,18]] -> Output: [[1,6],[8,10],[15,18]]",
                cpp_solution="""#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};""",
                time_complexity="O(N log N)",
                space_complexity="O(N)",
                explanation="Sort intervals by starting time. Iterate and merge overlapping contiguous intervals."
            ),
            # 6. Recursion
            DsaProblem(
                topic="Recursion",
                title="Subsets Generation (Power Set)",
                difficulty="Medium",
                description="Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
                constraints="1 <= nums.length <= 10",
                examples="Input: nums = [1,2,3] -> Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
                cpp_solution="""#include <vector>
using namespace std;

class Solution {
public:
    void backtrack(int index, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
        result.push_back(current);
        for (int i = index; i < nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1, nums, current, result);
            current.pop_back();
        }
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> current;
        backtrack(0, nums, current, result);
        return result;
    }
};""",
                time_complexity="O(N * 2^N)",
                space_complexity="O(N)",
                explanation="State space tree exploration: at each step, make a decision to include or exclude the current element."
            ),
            # 7. Linked Lists
            DsaProblem(
                topic="Linked Lists",
                title="Reverse a Singly Linked List",
                difficulty="Easy",
                description="Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
                constraints="0 <= Number of nodes <= 5000",
                examples="Input: head = [1,2,3,4,5] -> Output: [5,4,3,2,1]",
                cpp_solution="""struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(1)",
                explanation="Maintain three pointers: prev, curr, and nextNode to iteratively reverse pointer directions in O(1) auxiliary space."
            ),
            # 8. Stack and Queue
            DsaProblem(
                topic="Stack and Queue",
                title="Valid Parentheses",
                difficulty="Easy",
                description="Given a string `s` containing just characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
                constraints="1 <= s.length <= 10^4",
                examples="Input: s = \"()[]{}\" -> Output: true",
                cpp_solution="""#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(N)",
                explanation="Use a LIFO stack to verify that each closing bracket matches the most recent open bracket."
            ),
            # 9. Hashing
            DsaProblem(
                topic="Hashing",
                title="Group Anagrams",
                difficulty="Medium",
                description="Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
                constraints="1 <= strs.length <= 10^4",
                examples="Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"] -> Output: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
                cpp_solution="""#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (string& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> result;
        for (auto& pair : map) {
            result.push_back(pair.second);
        }
        return result;
    }
};""",
                time_complexity="O(N * K log K)",
                space_complexity="O(N * K)",
                explanation="Sort each string to form a canonical anagram key and bucket matching strings in an unordered_map."
            ),
            # 10. Trees and Graphs
            DsaProblem(
                topic="Trees and Graphs",
                title="Lowest Common Ancestor in Binary Tree",
                difficulty="Medium",
                description="Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.",
                constraints="2 <= Number of nodes <= 10^5",
                examples="Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1 -> Output: 3",
                cpp_solution="""struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(H)",
                explanation="Post-order traversal: if both left and right recursive calls return non-null pointers, the current node is the LCA."
            ),
            # 11. Greedy Algorithms
            DsaProblem(
                topic="Greedy Algorithms",
                title="Jump Game",
                difficulty="Medium",
                description="You are given an integer array `nums`. You are initially positioned at the array's first index. Return true if you can reach the last index.",
                constraints="1 <= nums.length <= 10^4",
                examples="Input: nums = [2,3,1,1,4] -> Output: true",
                cpp_solution="""#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= nums.size() - 1) return true;
        }
        return true;
    }
};""",
                time_complexity="O(N)",
                space_complexity="O(1)",
                explanation="Greedily update the furthest accessible index at each step; return false if the current index exceeds max reachable."
            ),
            # 12. Dynamic Programming
            DsaProblem(
                topic="Dynamic Programming",
                title="Longest Common Subsequence (LCS)",
                difficulty="Medium",
                description="Given two strings `text1` and `text2`, return the length of their longest common subsequence.",
                constraints="1 <= text1.length, text2.length <= 1000",
                examples="Input: text1 = \"abcde\", text2 = \"ace\" -> Output: 3",
                cpp_solution="""#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1])
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};""",
                time_complexity="O(M * N)",
                space_complexity="O(M * N)",
                explanation="Bottom-up 2D DP table where dp[i][j] represents LCS length of prefixes text1[0..i-1] and text2[0..j-1]."
            ),
            # 13. Backtracking
            DsaProblem(
                topic="Backtracking",
                title="N-Queens Puzzle",
                difficulty="Hard",
                description="The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
                constraints="1 <= n <= 9",
                examples="Input: n = 4 -> Output: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]",
                cpp_solution="""#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
    unordered_set<int> cols, diag1, diag2;
    vector<vector<string>> results;
public:
    void solve(int row, int n, vector<string>& board) {
        if (row == n) {
            results.push_back(board);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col))
                continue;
            board[row][col] = 'Q';
            cols.insert(col); diag1.insert(row - col); diag2.insert(row + col);
            solve(row + 1, n, board);
            board[row][col] = '.';
            cols.erase(col); diag1.erase(row - col); diag2.erase(row + col);
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        solve(0, n, board);
        return results;
    }
};""",
                time_complexity="O(N!)",
                space_complexity="O(N)",
                explanation="Row-by-row placement with sets tracking attacked columns, main diagonals (row - col), and anti-diagonals (row + col)."
            ),
            # 14. Heap and Priority Queue
            DsaProblem(
                topic="Heap and Priority Queue",
                title="Top K Frequent Elements",
                difficulty="Medium",
                description="Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in any order.",
                constraints="1 <= nums.length <= 10^5, k is in range [1, unique elements]",
                examples="Input: nums = [1,1,1,2,2,3], k = 2 -> Output: [1,2]",
                cpp_solution="""#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        
        // Min-heap storing pair of {frequency, element}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (auto& p : count) {
            minHeap.push({p.second, p.first});
            if (minHeap.size() > k) minHeap.pop();
        }
        
        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return result;
    }
};""",
                time_complexity="O(N log K)",
                space_complexity="O(N + K)",
                explanation="Frequency count via hash map followed by maintaining a min-heap of size K to retain the top K elements."
            )
        ]
        db.add_all(dsa_data)
        db.commit()

    # Seed Interview Questions (Technical, HR, Company-wise, Project, Mock)
    if db.query(InterviewQuestion).count() == 0:
        interview_qs = [
            InterviewQuestion(
                category="Technical",
                sub_category="Data Structures & Algorithms",
                company="General",
                question="What is the difference between QuickSort and MergeSort? In what scenarios is one preferred over the other?",
                answer="MergeSort is a stable divide-and-conquer algorithm with guaranteed O(N log N) worst-case time complexity, but requires O(N) auxiliary space. QuickSort is an in-place algorithm with average O(N log N) time and cache-friendly locality of reference, but has worst-case O(N^2) if pivot selection is poor. MergeSort is preferred for linked lists and external storage, while QuickSort is often preferred for in-memory arrays.",
                tips="Always discuss cache performance, stability, and worst-case recursion stack limits.",
                difficulty="Medium"
            ),
            InterviewQuestion(
                category="Technical",
                sub_category="DBMS",
                company="General",
                question="Explain ACID properties in Database Management Systems with a real banking transfer example.",
                answer="ACID stands for Atomicity (all-or-nothing: debit and credit both succeed or both rollback), Consistency (database state moves between valid states adhering to constraints), Isolation (concurrent transactions execute independently without dirty reads), and Durability (once committed, changes survive power failures via write-ahead logging).",
                tips="Demonstrate with SQL transaction pseudo-code: BEGIN TRANSACTION ... COMMIT / ROLLBACK.",
                difficulty="Easy"
            ),
            InterviewQuestion(
                category="Technical",
                sub_category="Operating Systems",
                company="General",
                question="What are the four necessary conditions for a Deadlock to occur, and how can Coffman's conditions be prevented?",
                answer="The four Coffman conditions are: 1. Mutual Exclusion (non-shareable resources), 2. Hold and Wait (process holding resources requests more), 3. No Preemption (resources cannot be forcibly taken), 4. Circular Wait (closed loop of processes waiting for each other). Preventing deadlock requires breaking at least one condition, such as imposing a global linear ordering on resource acquisition to eliminate circular wait.",
                tips="Mention Banker's Algorithm for deadlock avoidance vs Resource Allocation Graphs.",
                difficulty="Medium"
            ),
            InterviewQuestion(
                category="HR",
                sub_category="Behavioral",
                company="General",
                question="Why do you want to join the Government Sector / Public Sector instead of private enterprise?",
                answer="I am driven by high-impact public service, institutional stability, and the opportunity to contribute directly to national digital infrastructure and citizen empowerment at scale. Working on public sector projects provides a unique sense of societal responsibility and long-term nation building.",
                tips="Avoid sounding like you only seek job security; emphasize public service impact and technical rigor.",
                difficulty="Easy"
            ),
            InterviewQuestion(
                category="Company-wise",
                sub_category="System Architecture",
                company="NIC",
                question="How would you design a scalable Citizen Certificate Verification Portal handling 10 million requests on peak days?",
                answer="Use a 3-tier architecture: 1. Frontend SPA with CDN caching for static assets. 2. Stateless FastAPI/Go microservices behind an NGINX load balancer. 3. Clustered MySQL with Read Replicas and Redis in-memory cache for frequently verified certificates. 4. Asynchronous message queuing for non-critical notification delivery.",
                tips="Highlight rate-limiting, database connection pooling, and PKI digital signature verification.",
                difficulty="Hard"
            ),
            InterviewQuestion(
                category="Company-wise",
                sub_category="Coding Assessment",
                company="TCS",
                question="Given an array representing daily stock prices, find the maximum profit you can achieve with at most one transaction.",
                answer="Keep track of the minimum buying price seen so far (`minPrice = min(minPrice, price)`). At each day, calculate potential profit (`price - minPrice`) and update `maxProfit`. Runs in single pass O(N) time and O(1) space.",
                tips="Clarify whether short selling is permitted (usually not).",
                difficulty="Easy"
            )
        ]
        db.add_all(interview_qs)
        db.commit()

    # Seed Core CS Concepts (The Image: DSA, DBMS, Operating Systems, Machine Learning)
    if db.query(CoreCSConcept).count() == 0:
        core_cs_data = [
            # 1. DBMS
            CoreCSConcept(
                domain="DBMS",
                topic="Database Normalization (1NF, 2NF, 3NF, BCNF)",
                summary="Systematic approach of decomposing tables to eliminate data redundancy and insertion/update/deletion anomalies.",
                detailed_explanation="""### Normalization Forms Breakdown:
1. **First Normal Form (1NF)**: Every attribute contains atomic (indivisible) values; no repeating groups.
2. **Second Normal Form (2NF)**: In 1NF and every non-prime attribute is fully functionally dependent on the entire primary key (no partial dependencies).
3. **Third Normal Form (3NF)**: In 2NF and no transitive dependency exists (non-prime attributes must not depend on other non-prime attributes). Rule of thumb: 'Every attribute must depend on the key, the whole key, and nothing but the key.'
4. **Boyce-Codd Normal Form (BCNF)**: Stricter version of 3NF. For every non-trivial functional dependency X -> Y, X must be a super key.""",
                key_takeaways="Reduces disk redundancy, prevents anomalies, improves data integrity. Tradeoff: Increases number of table JOIN operations.",
                interview_frequency="Very High",
                sample_questions="What is the difference between 3NF and BCNF? Give an example where a relation is in 3NF but not in BCNF."
            ),
            CoreCSConcept(
                domain="DBMS",
                topic="Indexing & B+ Trees in Relational Databases",
                summary="How B+ Tree indexes accelerate SQL search, range scans, and JOIN performance from O(N) table scans to O(log N).",
                detailed_explanation="""### B+ Tree Index Mechanics:
- **Internal Nodes**: Store routing keys and child pointers to direct search queries.
- **Leaf Nodes**: Store all actual data records or row pointers, connected in a bidirectional linked list for high-speed sequential range queries (e.g. `BETWEEN`, `>`, `<`).
- **Clustered vs Non-Clustered**: Clustered index dictates the physical sorting order of data rows on disk (only 1 per table, typically the Primary Key). Secondary/Non-clustered indexes contain a pointer back to the clustered index key.""",
                key_takeaways="Lookup complexity O(log N). Excessive indexes slow down INSERT/UPDATE/DELETE operations due to tree rebalancing.",
                interview_frequency="Very High",
                sample_questions="Why do relational databases prefer B+ Trees over Hash Indexes or Binary Search Trees?"
            ),
            # 2. Operating Systems
            CoreCSConcept(
                domain="Operating Systems",
                topic="Process Synchronization & Semaphores",
                summary="Mechanisms to coordinate concurrent processes and prevent race conditions in shared memory sections.",
                detailed_explanation="""### Concurrency & Synchronization Primitives:
- **Critical Section Problem**: A region of code accessing shared resources that must not be accessed concurrently by more than one thread.
- **Mutex (Mutual Exclusion)**: A binary locking mechanism with ownership semantics (the thread that locks it must unlock it).
- **Counting Semaphore**: An integer variable accessed via atomic operations `wait()` (P) and `signal()` (V) used to restrict access to a finite pool of resources.
- **Classic Problems**: Producer-Consumer (Bounded Buffer), Readers-Writers, Dining Philosophers.""",
                key_takeaways="Always release locks in `finally`/RAII blocks to prevent deadlocks. Beware of priority inversion.",
                interview_frequency="Very High",
                sample_questions="Explain the difference between a Mutex and a Counting Semaphore. What is a spinlock?"
            ),
            CoreCSConcept(
                domain="Operating Systems",
                topic="Virtual Memory & Paging Mechanisms",
                summary="How modern OS maps logical addresses to physical RAM frames, managing page faults and page replacement algorithms.",
                detailed_explanation="""### Memory Virtualization:
- **Paging**: Dividing logical memory into fixed-size blocks called **pages** and physical memory into blocks of the same size called **frames**.
- **Page Table**: Data structure used by the Memory Management Unit (MMU) to translate virtual addresses to physical frame addresses.
- **TLB (Translation Lookaside Buffer)**: High-speed hardware associative cache that stores recent virtual-to-physical translations to eliminate extra memory lookups.
- **Page Fault**: Interrupt generated by hardware when a program accesses a page mapped in virtual address space but not currently loaded into physical RAM.
- **Page Replacement**: LRU (Least Recently Used), FIFO, and Optimal (Belady's Anomaly).""",
                key_takeaways="Virtual memory provides process isolation, memory protection, and the illusion of contiguous memory larger than physical RAM.",
                interview_frequency="Very High",
                sample_questions="What happens step-by-step when a Page Fault occurs? What is Thrashing and how can it be resolved?"
            ),
            # 3. Machine Learning
            CoreCSConcept(
                domain="Machine Learning",
                topic="Supervised vs Unsupervised Learning & The Bias-Variance Tradeoff",
                summary="Foundational ML paradigm taxonomy, error decomposition, and model generalization evaluation.",
                detailed_explanation="""### Core Machine Learning Principles:
- **Supervised Learning**: Training on labeled data $(X, y)$ to learn mapping function $f(X) \approx y$. Tasks: Regression (continuous target) and Classification (discrete class label). Algorithms: Linear/Logistic Regression, Decision Trees, Random Forest, SVM.
- **Unsupervised Learning**: Uncovering latent patterns, groupings, or representations in unlabeled data $X$. Tasks: Clustering (K-Means, DBSCAN), Dimensionality Reduction (PCA, t-SNE).
- **Bias-Variance Tradeoff**:
  - **High Bias (Underfitting)**: Model makes overly simplistic assumptions, failing to capture training trends (e.g. linear model on non-linear data).
  - **High Variance (Overfitting)**: Model fits noise in the training set, failing to generalize to unseen test data.
  - **Optimal Point**: Balanced model minimizing Total Expected Error = $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$.""",
                key_takeaways="Use cross-validation, regularization (L1 Lasso, L2 Ridge), and feature selection to control variance.",
                interview_frequency="Very High",
                sample_questions="How do L1 and L2 regularization differ mathematically in preventing overfitting in regression?"
            ),
            CoreCSConcept(
                domain="Machine Learning",
                topic="Classification Evaluation Metrics: Precision, Recall, F1, ROC-AUC",
                summary="Quantifying classifier performance beyond simple accuracy, especially in imbalanced datasets.",
                detailed_explanation="""### Metric Formulations:
- **Confusion Matrix**: TP (True Positive), FP (False Positive), TN (True Negative), FN (False Negative).
- **Accuracy**: $(TP + TN) / (TP + TN + FP + FN)$ - Misleading when classes are skewed (e.g., 99% negative).
- **Precision**: $TP / (TP + FP)$ - What proportion of positive predictions was actually correct? Crucial for spam detection.
- **Recall (Sensitivity)**: $TP / (TP + FN)$ - What proportion of actual positives was identified? Critical for disease screening / fraud detection.
- **F1-Score**: Harmonic mean of Precision and Recall: $2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$.
- **ROC-AUC**: Area Under the Receiver Operating Characteristic curve plotting True Positive Rate vs False Positive Rate across all classification thresholds.""",
                key_takeaways="In imbalanced datasets, always report Precision-Recall curves or F1-score rather than raw accuracy.",
                interview_frequency="Very High",
                sample_questions="When is Recall prioritized over Precision? Why is the Harmonic Mean used for F1-score rather than the Arithmetic Mean?"
            )
        ]
        db.add_all(core_cs_data)
        db.commit()

    # Seed UPSC Specific Data (IAS, IPS, Syllabus, Current Affairs, Roadmap)
    seed_upsc_data(db)

    # Seed All Government Exams + Study Resources (Textbooks, Notes, YouTube links)
    seed_resources(db)

    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
