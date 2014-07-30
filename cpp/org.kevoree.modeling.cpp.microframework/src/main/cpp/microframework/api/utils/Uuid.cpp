#include <microframework/api/utils/Uuid.h>


#ifdef __MACH__
#include <mach/clock.h>
#include <mach/mach.h>
#endif




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

#ifdef __MACH__ // OS X does not have clock_gettime, use clock_get_time
	clock_serv_t cclock;
	mach_timespec_t mts;
	host_get_clock_service(mach_host_self(), CALENDAR_CLOCK, &cclock);
	clock_get_time(cclock, &mts);
	mach_port_deallocate(mach_task_self(), cclock);
	ts.tv_sec = mts.tv_sec;
	ts.tv_nsec = mts.tv_nsec;
#else
	clock_gettime(CLOCK_REALTIME, &ts);
#endif
	srand(ts.tv_nsec);
	for(int i=0;i<length;i++){
		str[i] =randchar();
	}

	return str;
}
