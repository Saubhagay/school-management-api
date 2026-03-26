const db = require('../config/db');
const geolib = require('geolib');

// Add School API
const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields (name, address, latitude, longitude) are required.' 
            });
        }

        if (typeof name !== 'string' || typeof address !== 'string') {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and address must be strings.' 
            });
        }

        const latNum = parseFloat(latitude);
        const lonNum = parseFloat(longitude);

        if (isNaN(latNum) || isNaN(lonNum)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Latitude and longitude must be valid numbers.' 
            });
        }
        
        if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
            return res.status(400).json({ 
                success: false, 
                message: 'Latitude must be between -90 and 90. Longitude must be between -180 and 180.' 
            });
        }

        // Insert into database
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [name, address, latNum, lonNum]);

        res.status(201).json({
            success: true,
            message: 'School added successfully.',
            data: {
                id: result.insertId,
                name,
                address,
                latitude: latNum,
                longitude: lonNum
            }
        });

    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while adding school.' 
        });
    }
};

// List Schools API
const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide user latitude and longitude in query parameters.' 
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ 
                success: false, 
                message: 'User latitude and longitude must be valid numbers.' 
            });
        }

        // Fetch all schools
        const [schools] = await db.query('SELECT * FROM schools');

        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No schools found.',
                data: []
            });
        }

        // Calculate distance and sort
        const userLocation = { latitude: userLat, longitude: userLon };

        const schoolsWithDistance = schools.map(school => {
            const distance = geolib.getDistance(
                userLocation,
                { latitude: school.latitude, longitude: school.longitude }
            );

            return {
                ...school,
                distance // in meters
            };
        });

        // Sort by distance (ascending)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            message: 'Schools retrieved successfully.',
            data: schoolsWithDistance
        });

    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while retrieving schools.' 
        });
    }
};

module.exports = {
    addSchool,
    listSchools
};
