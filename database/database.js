let db = {
  "gateways" : [
    {
      "serial_number": "ABC123",
      "name": "Gateway 1",
      "ipv4_address": "192.168.0.1",
      "devices": [1, 2]
    },
    {
      "serial_number": "DEF456",
      "name": "Gateway 2",
      "ipv4_address": "192.168.0.2",
      "devices": [3]
    },
    {
      "serial_number": "Ah38HJD",
      "name": "Gateway 4",
      "ipv4_address": "192.168.1.20",
      "devices": [4,5]
}
  ],
  "devices" : [
    {
      "uid": 1,
      "vendor": "Vendor A",
      "creation_date": "2023-07-08",
      "status": "online"
    },
    {
      "uid": 2,
      "vendor": "Vendor B",
      "creation_date": "2023-07-08",
      "status": "offline"
    },
    {
      "uid": 3,
      "vendor": "Vendor C",
      "creation_date": "2023-07-08",
      "status": "online"
    }
  ]
}


module.exports.db = db