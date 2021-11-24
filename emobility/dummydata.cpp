# define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <ctime>     //시간을 위한 헤더파일
#include <Windows.h> //Sleep함수를 위한 헤더파일
#include <cstdlib> //rand 난수 생성을 위한 헤더파일
#include <string> //string

using namespace std;

#define ONE_SECOND 1000

int main(void) {

	//파일 생성
	FILE* fp = fopen("dummy.txt", "w");
	char str[30];

	int Verticle, Horizion, Theta;

	int i = 0;

	while(true){
		if (i == 1000 ) {
			break;
		}
		time_t curTime = time(NULL);

		struct tm* pLocal = NULL;

	#if defined(_WIN32) || defined(_WIN64) 
			pLocal = localtime(&curTime);
	#else 
			localtime_r(&curTime, pLocal);
	#endif 
		if (pLocal == NULL)
		{
			// Failed to convert the current time 
			return 1;
		}
		
		Verticle = rand() % 360;
		Horizion = rand() % 360;
		Theta = rand() % 360;

		printf("%04d-%02d-%02dT%02d:%02d:%02d %d %d %d \n", pLocal->tm_year + 1900, pLocal->tm_mon + 1, pLocal->tm_mday, pLocal->tm_hour, pLocal->tm_min, pLocal->tm_sec, Verticle, Horizion, Theta);

		sprintf(str, "%04d-%02d-%02dT%02d:%02d:%02d %d %d %d \n", pLocal->tm_year + 1900, pLocal->tm_mon + 1, pLocal->tm_mday, pLocal->tm_hour, pLocal->tm_min, pLocal->tm_sec, Verticle, Horizion, Theta);
		fputs(str, fp);

		Sleep(ONE_SECOND);

		i++;
	}

	return 0;
}
