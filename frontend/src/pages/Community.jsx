import React, { useState } from 'react';
import { ArrowLeft, Users, MessageSquare, ThumbsUp, Sparkles, Send, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Community() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Aditya Pratap (AIR 64 CSE)",
      tag: "UPSC Mains Strategy",
      content: "For GS Paper 3, relying purely on static textbooks will hurt your marks. Integrate the latest Economic Survey graphs and NITI Aayog policy indices into every 15-marker answer.",
      likes: 142,
      comments: 18,
      time: "2 hours ago"
    },
    {
      id: 2,
      author: "Simran Kaur (SBI PO Manager)",
      tag: "Banking Interview",
      content: "During the interview panel discussion, focus on real monetary concepts (Inflation targeting, UPI 2.0, digital rupee) rather than giving generic textbook answers.",
      likes: 98,
      comments: 12,
      time: "5 hours ago"
    },
    {
      id: 3,
      author: "Karthik Nair (Income Tax Inspector)",
      tag: "SSC CGL Math Tricks",
      content: "Do not solve geometry questions by proving theorems during Tier 1. Use angle assumption techniques (30-60-90 or 45-45-90) to eliminate 3 options in under 15 seconds.",
      likes: 176,
      comments: 24,
      time: "1 day ago"
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setPosts([
      {
        id: Date.now(),
        author: "Aspirant Candidate",
        tag: "Discussion & Doubt",
        content: newPost,
        likes: 1,
        comments: 0,
        time: "Just now"
      },
      ...posts
    ]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/guidance')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guidance Center
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-4 h-4" />
            1,200+ Aspirants & Toppers
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
            Community & Mentorship Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Exchange preparation strategies, discuss recurring exam patterns, and get mentorship feedback from selected officers.
          </p>
        </div>

        {/* Create Post Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl mb-8">
          <form onSubmit={handlePost} className="space-y-4">
            <textarea
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share a study tip, ask a doubt, or discuss cutoffs with fellow aspirants..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs disabled:opacity-40 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Post to Community
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{post.author}</h4>
                    <span className="text-[11px] text-slate-400">{post.time}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="flex items-center gap-6 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <button
                  onClick={() => {
                    setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
                  }}
                  className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" /> {post.likes} Helpful
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> {post.comments} Replies
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

