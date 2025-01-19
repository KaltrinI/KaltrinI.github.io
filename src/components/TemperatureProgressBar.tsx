interface TemperatureProgressBarProps {
    value: number;
}

const TemperatureProgressBar: React.FC<TemperatureProgressBarProps> = ({ value }) => {
    const progress = Math.min(Math.max(value, 0), 100);

    return (
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
            <div
                className="h-full rounded"
                style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, #3b82f6, #fbbf24, #ef4444)', // blue -> yellow -> red
                }}
            />
        </div>
    );
};

export default TemperatureProgressBar