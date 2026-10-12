const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database');
const { getCategoryUsingAI } = require('./aiService');

const postExpenseService = async (req) => {
    const t = await sequelize.transaction();
    try {
        const { name, expenseamount, description } = req.body;
        const parsedAmount = Number(expenseamount);
        
        // AI ద్వారా ఆటోమేటిక్‌గా కేటగిరీని కనుగొనడం
        const aiCategory = await getCategoryUsingAI(description);

        let user = await User.findOne({ where: { name: name }, transaction: t });
        
        if (!user) {
            user = await User.create({
                name: name,
                email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
                ispremiumuser: true,
                totalExpense: parsedAmount
            }, { transaction: t });
        } else {
            await user.increment('totalExpense', { by: parsedAmount, transaction: t });
            await user.reload({ transaction: t });
        }

        const expense = await Expense.create({
            expenseamount: parsedAmount,
            description,
            category: aiCategory, // AI ఇచ్చిన కేటగిరీని సేవ్ చేయడం
            userId: user.id 
        }, { transaction: t });
        
        await t.commit();
        return expense;
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

module.exports = { postExpenseService };