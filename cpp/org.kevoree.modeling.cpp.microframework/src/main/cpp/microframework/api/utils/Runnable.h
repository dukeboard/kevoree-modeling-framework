#ifndef __RUNNABLE_H
#define __RUNNABLE_H

#include <atomic>
#include <thread>
using namespace std;

class Runnable
{
public:
	Runnable() : m_stop(), m_thread() {

		started = false;
	}
	virtual ~Runnable() { try { stop(); } catch(...) { /*??*/ } }

	Runnable(Runnable const&) = delete;
	Runnable& operator =(Runnable const&) = delete;

	void stop() {
		if(started ==true){
			m_stop = true;
			started =false;
			m_thread.join();
		}
	}
	void start() {
		if(started == false)
		{
			m_thread = std::thread(&Runnable::run, this);
			started = true;
		}else 
		{

			cout << "already started " << endl;
		}



	}
	void join() { m_thread.join();   }

protected:
	virtual void run() = 0;
	std::atomic<bool> m_stop;
	std::atomic<bool> started;


private:
	std::thread m_thread;
};
#endif
