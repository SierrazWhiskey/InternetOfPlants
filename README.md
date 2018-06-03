# InternetOfPlants
Plant sensing

# Project Breakdown

* Device Control
  * Read temperature/humidity from a sensor
  * Publish timestamped sensor data to web interface

* Web Interface
  * Load sensor data into a DB
    * MongoDB
  * Display sensor data in pagenated web table
    * Node.js using Express, SASS, etc.

* Machine Learning
  * Learn model for plants needing water
  * Output "Plant is thirsty!" based on latest sensor data

# Hardware

* SHT20 I2C Temperature and Humidity sensor - TBD
* Adapter (possibly)
* 4-pin connector cable
* ARM M0-based microcontroller (?)
* Power supply

# Software

## Embedded
* MBedOS
  * MBed Cloud Client
  * i2c interface
  * main application
    * Initialize devices
    * Sanity checks
    * Grab data
    * Connect to Cloud
    * Push data

## Cloud
* MBedCloudServer
* REST API server

## Web Server
* REST API client
  * Grab latest data
  * Load into DB
  * Display DB
