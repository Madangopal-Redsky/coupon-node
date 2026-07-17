// module.exports = function (Sequelize, Schema, Campaign, Brand, Coupon) {
//     const bags = Schema.define('bagsMaster', {
//         productId: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//     }, {
//         underscored: true,
//     });
//     bags.belongsTo(Campaign, { as: 'campaignDetails', foreignKey: 'campaign_id', });
//     bags.belongsTo(Brand, { as: 'brandDetails', foreignKey: 'brand_id', });
//     bags.belongsTo(Coupon, { as: 'coupenDetails', foreignKey: 'coupon_id', })

//     bags.sync({ force: false });

//     return bags;
// };
module.exports = function (Sequelize, Schema, Campaign, Brand, Coupon) {
    const Bags = Schema.define('bagsMaster', {
        productId: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true, // Ensures each productId is unique
        },
        bagName: {
            type: Sequelize.STRING,
            allowNull: false, // Add bag name (e.g., "Bag1")
        },
        expiryDate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        startingDate: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isExpired: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        underscored: true,
        timestamps: true, // Automatically add createdAt and updatedAt fields
    });

    // Associations
    Bags.belongsTo(Campaign, {
        as: 'campaignDetails',
        foreignKey: 'campaign_id',
        onDelete: 'CASCADE', // Cascade delete if Campaign is deleted
        onUpdate: 'CASCADE',
    });

    Bags.belongsTo(Brand, {
        as: 'brandDetails',
        foreignKey: 'brand_id',
        onDelete: 'SET NULL', // Nullify if Brand is deleted
        onUpdate: 'CASCADE',
    });

    Bags.belongsTo(Coupon, {
        as: 'couponDetails', // Fixed naming consistency
        foreignKey: 'coupon_id', // Renamed to 'coupon_id'
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });

    // Sync without force to avoid dropping tables
    Bags.sync({ force: false });

    return Bags;
};
