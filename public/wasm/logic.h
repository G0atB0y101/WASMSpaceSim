#ifdef __EMSCRIPTEN__
    #include <emscripten.h> 
#else
    #define EMSCRIPTEN_KEEPALIVE 
#endif

struct body {
    int id;
    float mass;
    float position[3];
    float velocity[3];
    float acceleration[3];
    float spin[3];
    float angular_velocity[3];
    float angular_acceleration[3];
    float color[3]; 
    float radius;
};

class logic {
public:
    EMSCRIPTEN_KEEPALIVE
    const char* Simulate(const int* data[], int size); 

    EMSCRIPTEN_KEEPALIVE
    const char* getBodyData(); 

    bool ParseData(const int* data[], int size); 

    body bodies[100]; 
    int bodyCount;

    bool bCanSendData = false;
};