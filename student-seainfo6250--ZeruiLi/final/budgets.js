const BudgetManager = {
    budgets: {},

    setBudget: function(username, budget) {
        this.budgets[username] = parseFloat(budget);
        console.log(this.budgets);
       
    },

    getBudget: function(username) {
     
        return this.budgets[username] || 0;
    }
};

module.exports = BudgetManager;
