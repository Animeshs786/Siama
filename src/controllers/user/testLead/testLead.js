const TestLead = require("../../../models/testLead");




const addTestLead = async (req, res, next) => {
    const data = await TestLead.create(req.body);

    res.status(201).json({
      status: true,
      data: data,
    });
};
module.exports = addTestLead;
//given id should be valid
//given id should be of service, service must available
