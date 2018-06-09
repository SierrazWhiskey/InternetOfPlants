#include "mbed.h"
#include <string>
#include "TCPSocket.h"
#include "ESP8266Interface.h"

using namespace std;


//-- ESP8266 WIFI Setup - connect TX and RX --//
ESP8266Interface wifi(p9, p10);
//-- LED SETUP --//
DigitalOut led1(LED1);
//-- HUMIDITY SENSOR SETUP --//
I2C i2c(p28, p27);

class Peripheral{
    string peripheral_id, peripheral_name;
    void setId(string id){peripheral_id = id;}
    void setName(string name){peripheral_name = name;}
    public:
    string getId(){return peripheral_id;}
    string getName(){return peripheral_name;}
};

// main() runs in its own thread in the OS
int main() {
    //Initiate peripherals
    //Initiate wifi interface
    printf("WiFi example\r\n\r\n");
    
    printf("\r\nconnecting...\r\n");
    int ret = wifi.connect(MBED_CONF_APP_WIFI_SSID, MBED_CONF_APP_WIFI_PASSWORD, NSAPI_SECURITY_WPA_WPA2);
    if (ret != 0) {
        printf("\r\nconnection error\r\n");
        return -1;
    }

    printf("success\r\n\r\n");
    printf("ip: %s\r\n", wifi.get_ip_address());
    
}

