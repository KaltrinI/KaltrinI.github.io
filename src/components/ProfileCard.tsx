import PolygonSkillsChart, { Skill } from "./PolygonSkillsChart";
import TemperatureProgressBar from "./TemperatureProgressBar";

const ProfileCard: React.FC = () => {
    const skills: Skill[] = [
        { name: 'Mobile Development', percent: 90 },
        { name: 'Frontend Development', percent: 90 },
        { name: 'Backend Development', percent: 95 },
        { name: 'Development & Operations', percent: 88 },
        { name: 'Quality Assurance', percent: 90 },
        { name: 'Analytics', percent: 90 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col h-full">
            <img
                className="w-64 h-64 mx-auto rounded-full"
                src="portrait.png"
                alt="Profile card"
            />
            <h3 className="mt-4 text-xl font-bold text-center text-gray-900 dark:text-gray-100">
                Kaltrin Ismaili
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Software Engineer
            </p>
            <div className="mt-6 flex-grow">
                <h4 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
                    Professional Skills
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    {skills.map((skill) => (
                        <div key={skill.name}>
                            <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-1">
                                {skill.name}
                            </p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-4 relative">
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                    {skill.percent}%
                                </span>
                                <TemperatureProgressBar value={skill.percent} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <PolygonSkillsChart skills={skills} size={250} />
            </div>
        </div>
    );
};

export default ProfileCard