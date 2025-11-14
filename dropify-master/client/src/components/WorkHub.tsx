import React from 'react';
import { Calendar, MessageSquare, Building2, Video, Music, BookOpen, Play } from 'lucide-react';

export const WorkHub: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400">Next Meeting</h3>
          <Calendar className="text-purple-400" size={24} />
        </div>
        <p className="text-xl font-bold">Team Sync</p>
        <p className="text-sm text-zinc-400 mt-2">Starts in 15 minutes</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400">Unread Emails</h3>
          <MessageSquare className="text-blue-400" size={24} />
        </div>
        <p className="text-3xl font-bold">4</p>
        <p className="text-sm text-zinc-400 mt-2">2 marked as urgent</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400">Available Workspaces</h3>
          <Building2 className="text-green-400" size={24} />
        </div>
        <p className="text-3xl font-bold">3</p>
        <p className="text-sm text-zinc-400 mt-2">Within 10 minute radius</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Video, label: 'Join Meeting', color: 'text-purple-400' },
            { icon: Calendar, label: 'Schedule', color: 'text-blue-400' },
            { icon: Building2, label: 'Workspaces', color: 'text-green-400' },
            { icon: MessageSquare, label: 'Messages', color: 'text-orange-400' },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <Icon className={color} size={24} />
              <span className="mt-2 text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Entertainment</h3>
        <div className="space-y-4">
          {[
            {
              type: 'Podcast',
              title: 'Tech Today',
              duration: '32 mins',
              icon: Music,
              color: 'text-purple-400',
            },
            {
              type: 'Audiobook',
              title: 'Productivity Habits',
              duration: '45 mins',
              icon: BookOpen,
              color: 'text-blue-400',
            },
          ].map((item) => (
            <div key={item.type} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-zinc-700/50 rounded-lg">
                  <item.icon className={item.color} size={24} />
                </div>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-zinc-400">{item.type} • {item.duration}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-zinc-700/50 rounded-lg transition-colors">
                <Play size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);