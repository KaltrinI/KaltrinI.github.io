import React from 'react';
import ProfileCard from './ProfileCard';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="md:w-1/3">
            <ProfileCard />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4 text-center md:text-left text-gray-900 dark:text-gray-100">
              Hello, I'm Kaltrin
            </h2>
            <p className="text-lg text-gray-800 dark:text-gray-300" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
              I’m a versatile software engineer with a passion for continuous learning and self-development. With experience across various tech stacks, I thrive in roles spanning mobile engineering, web development, and DevOps. I’m a fast learner, a critical thinker, and a strong team player, always eager to contribute at every stage of the project lifecycle.
              <br /><br />
              I am an experienced software engineer with 8 years in the industry and a Bachelor's degree in Computer Science and Engineering. Throughout my career, I've contributed to projects in secure digital financial services, innovative identity solutions, streamlined insurance processes, effective content management, robust access control, efficient workforce scheduling, optimized ride-sharing platforms, AI-driven initiatives that convert publications into accessible content, and web forms platforms focused on accessibility. Working primarily with C# and JavaScript/TypeScript, I develop intuitive, reliable solutions that make technology more inclusive and user-centric.
              <br /><br />
              Outside of coding, I enjoy exploring new languages—both programming and spoken—as well as diving into the world of mathematics. I live by the motto: "Jack of all trades, master of one," because I believe in mastering the craft while staying curious and adaptable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
