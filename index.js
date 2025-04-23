const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const project1Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const project1Model = mongoose.model("Customers", project1Schema);

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    speciality: String,
    shiftstart: String,
    shiftend: String,
    slot:String,
    count:Number,

}, {
    timestamps: true
});

const doctorModel = mongoose.model("Doctor", doctorSchema);

const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    gender: String,
    place: String,
    reason: String,
    doctor: String,
    slot: String,
}, {
    timestamps: true
});

const appointmentModel = mongoose.model("Appointments", appointmentSchema);

const patientSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    gender: String,
    address: String,
    reason: String,
    admitdate:String,
    admittime: String,
    room: Number,
}, {
    timestamps: true
});

const patientModel = mongoose.model("Patients", patientSchema);

const staffSchema = new mongoose.Schema({
    staffid:Number,
    name: String,
    mobile: Number,
    gender: String,
    age: String,
    joiningdate: String,
}, {
    timestamps: true
});

const staffModel = mongoose.model("Staffs", staffSchema);

const equipmentSchema = new mongoose.Schema({
    name: String,
    manufacturedate: String,
    warranty: String,
    cost: String,
    seller:String,
}, {
    timestamps: true
});

const equipmentModel = mongoose.model("Equipments", equipmentSchema);

mongoose.connect("mongodb+srv://mern123:mern@cluster0.mfbpf0t.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error));

app.post('/Login', (req, res) => {
    const { email, password } = req.body;
    project1Model.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        });
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    project1Model.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Account already exists");
            } else {
                project1Model.create({ name, email, password })
                    .then(customer => res.json(customer))
                    .catch(err => res.json(err));
            }
        });
});

app.post("/doctors/create", async (req, res) => {
    const data = new doctorModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/doctors/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await doctorModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/doctors/", async (req, res) => {
    try {
        const data = await doctorModel.find({});
        res.json({ status: "success", data: data });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ status: "error", message: "Error fetching doctors", error: error.message });
    }
});


app.delete("/doctors/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await doctorModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
});

app.post("/appointments/create", async (req, res) => {
    try {
        console.log("Data received for appointment creation:", req.body);

        const data = new appointmentModel(req.body);
        console.log("Data about to be saved to MongoDB:", data);

        await data.save();
        console.log("Data saved successfully:", data);

        res.send({ success: true, message: "Data saved successfully", data: data });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ success: false, message: "Error creating appointment", error: error.message });
    }
});

app.put("/appointments/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await appointmentModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/appointments/", async (req, res) => {
    const data = await appointmentModel.find({});
    res.json({ success: true, data: data });
});

app.delete("/appointments/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await appointmentModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
});
app.post("/patients/create", async (req, res) => {
    const data = new patientModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/patients/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await patientModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/patients/", async (req, res) => {
    const data = await patientModel.find({});
    res.json({ success: true, data: data });
});

app.delete("/patients/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await patientModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
});
app.post("/staffs/create", async (req, res) => {
    const data = new staffModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/staffs/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await staffModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/staffs/", async (req, res) => {
    const data = await staffModel.find({});
    res.json({ success: true, data: data });
});

app.delete("/staffs/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await staffModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
});
app.post("/equipments/create", async (req, res) => {
    const data = new equipmentModel(req.body);
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/equipments/update", async (req, res) => {
    const { _id, ...rest } = req.body;
    const data = await equipmentModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/equipments/", async (req, res) => {
    const data = await equipmentModel.find({});
    res.json({ success: true, data: data });
});

app.delete("/equipments/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await equipmentModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data deleted successfully", data: data });
});
app.get("/doctors/:name/slots", async (req, res) => {
    const name = req.params.name.toLowerCase();
    const doctor = await doctorModel.findOne({ name: { $regex: new RegExp(name, "i") } });
    if (doctor) {
        const slots = doctor.slot.split(',').map(slot => slot.trim());
        res.json({ success: true, slots: slots });
    } else {
        res.status(404).json({ success: false, message: "Doctor not found" });
    }
});

app.put("/doctors/updateAppointment", async (req, res) => {
    const { doctorName } = req.body;
  
    try {
      const doctor = await doctorModel.findOne({ name: { $regex: new RegExp(doctorName, "i") } });
  
      if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
  
      if (doctor.count <= 0) {
        return res.status(400).json({ success: false, message: "All slots are filled. No slots available for appointment." });
      }
      doctor.count -= 1;
      await doctor.save();
  
      res.json({ success: true, message: "Appointment updated successfully", data: { doctor, updatedCount: doctor.count } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating appointment", error: error.message });
    }
  });
  
  
  


