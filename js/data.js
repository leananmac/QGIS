// GeoJSON data for Muteesa I Royal University facilities
// Real coordinates for Muteesa I Royal University campus in Mengo, Kampala

const facilitiesData = {
    "type": "FeatureCollection",
    "name": "muteesa_facilities",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "admin-block",
                "fid": 1,
                "name": "Administration Block",
                "Name": "Administration Block",
                "description": "Houses offices of the Vice Chancellor, Dean, and administrative departments.",
                "category": "service",
                "image": "img/admin.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.55439396255769, 0.306431460775709]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "lecture-hall",
                "fid": 2,
                "name": "Main Lecture Hall",
                "Name": "Main Lecture Hall",
                "description": "The central hall used for large lectures, presentations, and university events.",
                "category": "academic",
                "image": "img/mainhall.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555441913846224, 0.306685505936564]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "library",
                "fid": 3,
                "name": "University Library",
                "Name": "University Library",
                "description": "Main academic resource center with textbooks, journals, and study areas.",
                "category": "academic",
                "image": "img/library.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555115279678368, 0.306127513878913]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "computer-lab",
                "fid": 4,
                "name": "Computer Laboratory",
                "Name": "Computer Laboratory",
                "description": "Equipped with computers and internet access for ICT-related courses and research.",
                "category": "academic",
                "image": "img/mainlab.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555414694332235, 0.306322584276355]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "staff-quarters",
                "fid": 5,
                "name": "Staff Quarters",
                "Name": "Staff Quarters",
                "description": "Housing area for university lecturers and administrative staff.",
                "category": "residential",
                "image": "img/staff.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.55513342602103, 0.307102865830593]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "female-hostel",
                "fid": 6,
                "name": "Hall of Residence (Female)",
                "Name": "Hall of Residence (Female)",
                "description": "Female students' hostel located near the main gate.",
                "category": "residential",
                "image": "img/female.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555732255328763, 0.307184523199258]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "cafeteria",
                "fid": 7,
                "name": "University Cafeteria",
                "Name": "University Cafeteria",
                "description": "Main dining area offering affordable meals to students and staff.",
                "category": "service",
                "image": "img/carteen.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555251377248311, 0.307170913637857]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "student-affairs",
                "fid": 8,
                "name": "Student Affairs Office (GUILD)",
                "Name": "Student Affairs Office (GUILD)",
                "description": "Handles student welfare, registration, and discipline matters.",
                "category": "service",
                "image": "img/guild.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555632450444143, 0.306599312043378]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "health-centre",
                "fid": 9,
                "name": "Health Centre",
                "Name": "Health Centre",
                "description": "Provides basic medical care and first aid to students and staff.",
                "category": "service",
                "image": "img/clinic.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555378401646927, 0.307270717087728]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "sports-ground",
                "fid": 10,
                "name": "Sports Ground",
                "Name": "Sports Ground",
                "description": "Main field for football, athletics, and other outdoor activities.",
                "category": "service",
                "image": "img/sports.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.55494288942311, 0.307379593577433]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "chapel",
                "fid": 11,
                "name": "University Chapel",
                "Name": "University Chapel",
                "description": "Place of worship and spiritual gatherings for students and staff.",
                "category": "service",
                "image": "img/church.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555242304076984, 0.307325155332719]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "mosque",
                "fid": 12,
                "name": "University Mosque",
                "Name": "University Mosque",
                "description": "Place of worship and spiritual gatherings for students and staff.",
                "category": "service",
                "image": "img/mosque.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555010938208085, 0.305719226989062]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "quadrangle",
                "fid": 13,
                "name": "Lecture Hall (Quadrangle)",
                "Name": "Lecture Hall (Quadrangle)",
                "description": "One of the main teaching blocks located near the library, hosting lectures for first-year students.",
                "category": "academic",
                "image": "img/qudrangle.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555242304076984, 0.306699115498583]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "chwa-hall",
                "fid": 14,
                "name": "Lecture Hall (Chwa)",
                "Name": "Lecture Hall (Chwa)",
                "description": "Used for Faculty of Education classes.",
                "category": "academic",
                "image": "img/chwa.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555528108973853, 0.307093792789591]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "wifi-lab",
                "fid": 15,
                "name": "WifiLab",
                "Name": "WifiLab",
                "description": "It offers internet connectivity and comfortable seating.",
                "category": "academic",
                "image": "img/wifilab.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.554892986980803, 0.306295365151343]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "seminar-room",
                "fid": 16,
                "name": "Seminar Room (Resource Center)",
                "Name": "Seminar Room (Resource Center)",
                "description": "A small meeting room for departmental seminars, group presentations, and academic discussions.",
                "category": "academic",
                "image": "img/resource.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.554729669896872, 0.306145659962545]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "male-hostel",
                "fid": 17,
                "name": "Hall of Residence (Male)",
                "Name": "Hall of Residence (Male)",
                "description": "Male students' hostel providing on-campus accommodation.",
                "category": "residential",
                "image": "img/male.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.55586959488766, 0.306634849505752]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "art-workshop",
                "fid": 18,
                "name": "Art Workshop",
                "Name": "Art Workshop",
                "description": "A practical training space fitted with Art and Design tools.",
                "category": "academic",
                "image": "img/art.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.555337202952813, 0.306138335048577]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "quadrangle-1-2",
                "fid": 19,
                "name": "Lecture Hall (Quadrangle 1-2)",
                "Name": "Lecture Hall (Quadrangle 1-2)",
                "description": "A mid-sized lecture room primarily used for Faculty of Science in Arts and Technology Studies.",
                "category": "academic",
                "image": "img/qudrangle2.jpg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [32.554959620020313, 0.306429069752528]
            }
        }
    ]
};