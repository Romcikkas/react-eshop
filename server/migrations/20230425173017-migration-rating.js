// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn('devices', 'votes', {
//       type: Sequelize.INTEGER,
//       defaultValue: 0,
//     });
//     await queryInterface.addColumn('devices', 'total_rating', {
//       type: Sequelize.INTEGER,
//       defaultValue: 0,
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('devices', 'votes');
//     await queryInterface.removeColumn('devices', 'total_rating');
//   },
// };
