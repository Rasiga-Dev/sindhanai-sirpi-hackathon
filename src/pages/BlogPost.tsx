import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams();  // Get the dynamic blog slug from the URL

  // Dummy content for the sake of example
  const blogContent = {
    title: 'The Future of Hackathons: Trends and Predictions',
    date: 'March 25, 2025',
    author: 'John Doe',
    content: 'In this post, we’ll explore upcoming trends in the world of hackathons...',
    introduction: 'Hackathons have been a catalyst for innovation in the tech world for years. As the tech landscape evolves, so do hackathons...',
    body: [
      {
        heading: '1. The Rise of AI-Driven Hackathons',
        content: 'As AI advances, hackathons are embracing AI-powered platforms to create solutions faster and efficiently...'
      },
      {
        heading: '2. Diversity and Inclusion in Hackathons',
        content: 'Hackathons are increasingly becoming inclusive, with more events focused on promoting diversity...'
      },
      {
        heading: '3. Remote and Hybrid Hackathons',
        content: 'The shift to remote and hybrid formats has expanded participation in hackathons globally...'
      },
    ],
    conclusion: 'The future of hackathons looks bright, with inclusivity, AI, and global collaboration at the forefront.',
    relatedPosts: [
      { title: 'How to Build a Winning Team for a Hackathon', href: '/blog/winning-hackathon-team' },
      { title: '5 Key Skills Every Hackathon Participant Should Have', href: '/blog/key-skills-hackathon' },
    ],
    authorBio: {
      name: 'John Doe',
      bio: 'John Doe is a software engineer and hackathon enthusiast with over 30 hackathons under his belt...',
      image: 'https://via.placeholder.com/100', // Author's image URL
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h1 className="text-4xl font-extrabold text-red-800 mb-6">{blogContent.title}</h1>
      <p className="text-gray-600 text-sm mb-4">
        <span>{blogContent.date}</span> | <span>{blogContent.author}</span>
      </p>

      {/* Introduction Section */}
      <div className="mb-8 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="leading-relaxed">{blogContent.introduction}</p>
      </div>

      {/* Body Section */}
      <div className="space-y-8">
        {blogContent.body.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">{section.heading}</h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Conclusion Section */}
      <div className="mb-8 text-gray-700">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Conclusion</h3>
        <p className="leading-relaxed">{blogContent.conclusion}</p>
      </div>

      {/* Related Posts Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogContent.relatedPosts.map((post, index) => (
            <div key={index} className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md transition-all hover:shadow-xl">
              <a href={post.href} className="text-lg font-semibold text-red-800 hover:text-red-900">
                {post.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Author Bio Section */}
      <div className="flex items-center mb-8">
        <img src={blogContent.authorBio.image} alt={blogContent.authorBio.name} className="w-16 h-16 rounded-full mr-6" />
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{blogContent.authorBio.name}</h4>
          <p className="text-sm text-gray-600">{blogContent.authorBio.bio}</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Want to Stay Updated?</h2>
        <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest articles and updates on hackathons and tech trends.</p>
        <button className="px-6 py-3 bg-red-800 text-white rounded-full hover:bg-red-700 transition-all">
          Subscribe Now
        </button>
      </div>

      {/* Comment Section (Placeholder) */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
}
