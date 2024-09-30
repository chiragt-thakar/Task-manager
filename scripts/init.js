const mongoose = require('mongoose');
const configs = require('../src/config/config');

const logger = require('../src/config/logger');
const { User } = require('../src/models');

(async () => {
  try {
    const adminClient = new mongoose.mongo.MongoClient(configs.mongoose.admin_url);
    await adminClient.connect();
    logger.info('Admin database connected');

    try {
      const db = new mongoose.mongo.MongoClient(
        `mongodb://${configs.mongoose.username}:${configs.mongoose.password}@${configs.mongoose.host}/${configs.mongoose.database}`
      );
      await db.connect();
      logger.info('Super database connected');
    } catch (error) {
      logger.error('Super database user not found. creating new user');
      const adminDb = adminClient.db(configs.mongoose.database);

      await adminDb.addUser(configs.mongoose.username, configs.mongoose.password, {
        roles: ['readWrite', 'dbAdmin'],
      });

      logger.info('database user created !!');
      await mongoose.connect(
        `mongodb://${configs.mongoose.username}:${configs.mongoose.password}@${configs.mongoose.host}/${configs.mongoose.database}`
      );
      await User.create({
        name: `${configs.api.adminUser.firstName} ${configs.api.adminUser.lastName}`,
        email: `${configs.api.adminUser.email}`,
        password: `${configs.api.adminUser.password}`,
        role: 'admin',
        isEmailVerified: true,
      });
      logger.info(' admin data is inserted !!');

      //   await mongoose.disconnect();
      //   logger.info('Disconnect from db');
    }
    setTimeout(() => {
      // to ensure logger is finished logging before we exit the process
      process.exit(0);
    }, 3000);
  } catch (error) {
    logger.error('Error while executing init script');
    logger.error(error);

    /**
     * todo
     * write cleanup code in case of failure
     */

    setTimeout(() => {
      process.exit(1);
    }, 3000);
  }
})();
