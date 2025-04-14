module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Добавляем файл с настройками
}; 