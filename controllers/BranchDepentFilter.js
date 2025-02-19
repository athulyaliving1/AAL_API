var db = require("../db/connection.js").mysql_pool;

const getcountries = (req, res) => {
    const query =
        "SELECT DISTINCT branch_country_id, branch_country FROM master_branches";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching countries:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
        }
    });
};

const getstates = (req, res) => {
    const { branch_country_id } = req.query;

    // console.log("branch_country_id:", branch_country_id);

    const query = `SELECT DISTINCT branch_state,branch_state_id FROM master_branches`;

    db.query(query, [branch_country_id], (err, results) => {
        if (err) {
            console.error("Error fetching states:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
        }
    });
};

// API endpoint to fetch cities based on the state

const getcities = (req, res) => {
    const { branch_state_id } = req.query;

    // Replace this with your database query to fetch cities based on the state
    const query = `SELECT DISTINCT branch_city,branch_city_id FROM master_branches WHERE branch_state_id =${branch_state_id}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching cities:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
        }
    });
};

const branchlocation = (req, res) => {
    const { branch_city_id } = req.query;

    const query = `SELECT DISTINCT id,branch_name FROM master_branches WHERE branch_city_id=${branch_city_id}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching location:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
            // console.log(results);
        }
    });
};

const getTower = (req, res) => {
    const { branch_id } = req.query;

    const query = `SELECT DISTINCT mb.id,mfs.tower as towerno, mfs.branch_id,mb.branch_name, master_towers.tower FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id join master_towers on mfs.tower=master_towers.id WHERE mfs.branch_id = ${branch_id}; `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tower:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
            console.log(results);
        }
    });
};

const getmasterTower = (req, res) => {
    const { tower_id } = req.query;

    const query = `SELECT * FROM master_towers`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tower:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
            console.log(results);
        }
    });
};

const getFloor = (req, res) => {
    const { branch_id, tower_id } = req.query;
    console.log(branch_id, tower_id);

    // Validate that branch_id and tower_id are defined and not empty
    if (!branch_id || !tower_id) {
        return res
            .status(400)
            .json({ error: "Both branch_id and tower_id are required." });
    }
    console.log(branch_id);
    console.log(tower_id);

    // const query = `SELECT DISTINCT mb.id, mfs.branch_id,mb.branch_name,mfs.floor FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id WHERE mfs.branch_id = ${branch_id};`;
    const query = `SELECT DISTINCT  mb.id,mfs.tower, mfs.branch_id,mb.branch_name,mfs.floor FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id WHERE mfs.branch_id = ${branch_id} AND mfs.tower=${tower_id};`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tower:", err);
            res.status(500).send("An error occurred");
        } else {
            res.json(results);
            console.log(results);
        }
    });
};

const getSection = (req, res) => {
    const { branch_id, floor } = req.params;
    console.log(floor); // Output the value of 'floor' to the console for debugging purposes
    console.log(branch_id); // Output the value of 'branch_id' to the console for debugging purposes

    const sql = `SELECT DISTINCT mb.id, mb.branch_name, mfs.id AS flrefId, mfs.branch_id, mfs.section FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id
                   WHERE mfs.branch_id ='${branch_id}' AND mfs.floor ="${floor}"`;

    // const sql = `SELECT DISTINCT mb.id, mb.branch_name, mfs.id AS flrefId, mfs.branch_id, mfs.section FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id
    //                WHERE mfs.branch_id ='${branch_id}' AND mfs.floor ="${floor}"`;

    // const sql =
    //   "SELECT DISTINCT mb.id, mb.branch_name, mfs.branch_id, mfs.section FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id WHERE mfs.branch_id ='${" +
    //   branch_id +
    //   "}' AND mfs.floor ='${" +
    //   floor +
    //   "}'";
    // sql = "select distinct id from master_branches";

    console.log("SQL Query:", sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching section:", err);
            res.status(500).json({ error: "An error occurred" });
        } else {
            // res.status(200).json({ res: results });
            res.json(results);
            console.log(results);
            // res.send("Success");

            // Output the database query results to the console for debugging purposes
        }
    });
};

const getSection1 = (req, res) => {
    const { branch_id, floor } = req.params;
    console.log(floor); // Output the value of 'floor' to the console for debugging purposes
    console.log(branch_id); // Output the value of 'branch_id' to the console for debugging purposes

    const sql = `SELECT DISTINCT mb.id, mb.branch_name, mfs.id AS flrefId, mfs.branch_id, mfs.section FROM master_branches mb JOIN master_floor_section mfs ON mb.id = mfs.branch_id
                   WHERE mfs.branch_id ='${branch_id}' AND mfs.id ="${floor}"`;

    console.log("SQL Query:", sql);

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching section:", err);
            res.status(500).json({ error: "An error occurred" });
        } else {
            // res.status(200).json({ res: results });
            res.json(results);
            console.table(results);
            // res.send("Success");

            // Output the database query results to the console for debugging purposes
        }
    });
};

const staffSearch = (req, res) => {
    const query = "SELECT full_name, employee_id FROM staffs;";
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching staffs:", err);
            res.status(500).send("Error fetching staffs");
        } else {
            res.json(result);
        }
    });
};

const getBeds = (req, res) => {
    const floorId = req.params.roomId;
    console.log("Requested floorId:", floorId);

    // Use parameterized query to prevent SQL injection
    // const query = "SELECT DISTINCT * FROM master_beds WHERE room_id = ?";
    const query =
        " SELECT master_beds.id,master_beds.bed_number, master_rooms.room_number FROM master_beds JOIN master_rooms ON master_beds.room_id = master_rooms.id WHERE master_beds.room_id = ?";

    console.log("Query:", query);
    // Execute the parameterized query with floorId as a parameter
    db.query(query, [floorId], (err, result) => {
        if (err) {
            console.error("Error fetching rooms:", err);
            // Send an error response with a 500 status code and a meaningful error message
            res.status(500).json({ error: "Error fetching rooms" });
        } else {
            // Send the query result as JSON data in the response
            res.json(result);
            console.log(result);
        }
    });
};

const getRooms = (req, res) => {
    const floorId = req.params.floorId; // Use req.params to get the value of floorId from the URL

    console.log(floorId);
    const query = `SELECT DISTINCT * FROM master_rooms WHERE floor=${floorId}`;
    console.log(query);
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching rooms:", err);
            res.status(500).json({ error: "Error fetching rooms" });
        } else {
            res.json(result);
            console.log(result);
        }
    });
};

const getBranches = (req, res) => {
    const query = `SELECT DISTINCT  id,branch_name,branch_code FROM master_branches`;
    console.log(query);
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching branches:", err);
            res.status(500).json({ error: "Error fetching branches" });
        } else {
            res.json(result);
            console.log(result);
        }
    });
};

module.exports = {
    getcities,
    getstates,
    getcountries,
    staffSearch,
    branchlocation,
    getTower,
    getFloor,
    getSection,
    getBeds,
    getRooms,
    getBranches,
    getmasterTower,
    getSection1,
};