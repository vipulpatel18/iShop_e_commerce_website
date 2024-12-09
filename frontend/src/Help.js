const IndCurrency = (value) => {
    if (isNaN(value)) {
        return 'Invalid number';
    }
    return value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR',
    });
};


export {IndCurrency}