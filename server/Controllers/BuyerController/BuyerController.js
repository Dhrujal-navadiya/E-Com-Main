const authModel = require("../../models/authModel");

module.exports.getallBuyer = async (req, res) => {
  try {
    const buyers = await authModel.find({ role: "buyer" });
    console.log(buyers, "buyers are here");

    if (buyers.length === 0) {
      return res.status(404).json({ message: "No buyers found" });
    }

    res.status(200).json({ message: "Buyers found", buyers });
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ message: "Error fetching buyers" });
  }
};

// module.exports.getBuyerById = async (req, res) => {
//   try {
//     const buyerId = req.parmas.id;
//     console.log("buyerid {{{}}}}}}}}} --->", buyerId);

//     const buyer = await authModel.findById(buyerId);
//     console.log("buyer --->", buyer);
//     if (!buyer) {
//       return res.status(404).json({ message: "buyer not found" });
//     }
//     console.log(buyer, "buyer is here >>>>>>>>>>>>>>");
//     res.status(200).json(buyer);
//   } catch (error) {
//     console.error("Error fetching buyer by Id:", error);
//     res.status(500).json({ message: "Error fetching buyer by Id" });
//   }
// };

module.exports.getBuyerById = async (req, res) => {
  try {
    const buyerId = req.params.id;
    console.log("Buyer ID:", buyerId);

    const buyer = await authModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.status(200).json(buyer);
  } catch (error) {
    console.error("Error fetching buyer by ID:", error);
    res.status(500).json({ message: "Error fetching buyer by ID" });
  }
};
