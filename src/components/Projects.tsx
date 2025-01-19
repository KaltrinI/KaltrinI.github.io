// src/components/Projects.tsx

import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Ride Sharing App
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Xamarin Forms app that promotes an eco-friendly environment by offering carpooling. Users can browse available offers or submit their own, reducing carbon emissions and saving on travel costs.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              <strong>Roles:</strong> Solution architecture, Implementation, Development
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <strong>Technologies:</strong> .NET Core, Xamarin Forms
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Parking System with Automated Image Recognition
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Developed part of a generic task execution engine that processes events via API and triggers predefined tasks automatically.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              <strong>Roles:</strong> Development, System Architecture, Implementation
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <strong>Technologies:</strong> .NET Core, ASP.NET MVC, Angular, C#, Redis, Docker
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Trinsic Wallet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              A mobile solution for self-sovereign identity that stores verifiable digital credentials in a wallet using blockchain-based open standards.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              <strong>Roles:</strong> Implementation, Development
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <strong>Technologies:</strong> Xamarin Forms, C#
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              VIDSBEATS
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              A web application that allows users to create custom music videos from pre-defined templates, with rendering and cloud-based video delivery.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              <strong>Roles:</strong> Solution architecture, Implementation
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <strong>Technologies:</strong> .NET Core, React, Mongo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
