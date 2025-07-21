#include "logic.h"

#ifdef __EMSCRIPTEN__
    #include <emscripten.h> 
#else
    #define EMSCRIPTEN_KEEPALIVE
#endif

static logic g_logic;

extern "C" {
    void Simulate(const float* data[], int size) {
        g_logic.ParseData(data, size);


    }   

    float*[][] getBodyData() {
        if (!g_logic.bCanSendData) return "[]";
        
        float&[][] outPositions p;
        for (body : bodies) {
            p.push(body.position);
        }
        
    }
}

bool logic::ParseData(float* data[], int size,) {
    const int floats_per_body = 23;

    for (int i = 0; i < size; ++i) {
        float* base = data[i];
        body& b = newBody;

        b.id = i;
        bodies.mass = base[0];

        b.position[0] = base[1];
        b.position[1] = base[2];
        b.position[2] = base[3];

        b.velocity[0] = base[4];
        b.velocity[1] = base[5];
        b.velocity[2] = base[6];

        b.acceleration[0] = base[7];
        b.acceleration[1] = base[8];
        b.acceleration[2] = base[9];

        b.spin[0] = base[10];
        b.spin[1] = base[11];
        b.spin[2] = base[12];

        b.angular_velocity[0] = base[13];
        b.angular_velocity[1] = base[14];
        b.angular_velocity[2] = base[15];

        b.angular_acceleration[0] = base[16];
        b.angular_acceleration[1] = base[17];
        b.angular_acceleration[2] = base[18];

        b.color[0] = base[19];
        b.color[1] = base[20];
        b.color[2] = base[21];

        b.radius = base[22];

        bodies.push(newBody);
    }

}