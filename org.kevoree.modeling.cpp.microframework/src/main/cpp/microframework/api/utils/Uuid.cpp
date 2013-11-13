#include <utils/Uuid.h>




 char Uuid::randchar(){

       const char charset[] =
            "0123456789"
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            "abcdefghijklmnopqrstuvwxyz";
            const size_t max_index = (sizeof(charset) - 1);
            return charset[ rand() % max_index ];
  }
std::string Uuid::generateUUID()
{
    size_t length=16;
    std::string str(length,0);
    timespec ts;
    clock_gettime(CLOCK_REALTIME, &ts);
    srand(ts.tv_nsec);
    for(int i=0;i<length;i++){
          str[i] =randchar();
    }

    return str;
}