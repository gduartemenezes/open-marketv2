module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5440,
  username: 'postgres',
  password: 'docker',
  database: 'openmkt',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
