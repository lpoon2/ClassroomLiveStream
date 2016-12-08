CLASSROOM LIVE STREAMING

OBJECTIVES:
In our project, we aimed to stream video between Android devices through the use of an intermediate server that used the RTSP
protocol.

QUICK RUN:
We can start the server with the command
sudo server.js

The server will then wait for either a client to connect to it, or a client to publish streams to it.(Sudo is not required if we set the port in config.js to above 1023).
We publish streams from an android device using the libstreaming library. Libstreaming takes data from the Android Device's camera and converts it into .H264 and AAC formats for video and audio respectively, which should be recognized by the server.
To stream to the server, set the url to rtsp://localhost:80/live/STREAM_NAME, where localhost is the ip address of the server.
The server will indicate that it has begun uploading the stream, and the android device will report the bitrate being sent to the server in real time. The android device will be able to pause and resume the stream as well.
We use Android's VideoView to receive the streamed file. In the attached file, before running, we must set the url to rtsp://localhost:80/live/STREAM_NAME. The video should now successfully be live streaming from one Android device to another.

Alternatively, if you want to test receiving the streamed file independently of a live source, any .mp4 file in the file/ directory will be available at the url rtsp://localhost:80/file/filename (e.x. rtsp://192.168.1.1:80/file/test.mp4).

POSSIBLE HICCUPS:
Sometimes Android's VideoView displays a black screen and does not play back the video. 
This is usually because of a firewall that blocks UDP packets.
In this case, the file can still be played back on VLC media player on an Android device (or on any type of device). 
We are certain that play back works with VLC files, because even when the VLC media player does not successfully get the rtsp connection (usually because of a firewall on the ports that the server would like to stream to), it then proceeds to establish an rtsp connection over http, which is supported by our server, and performs quite well. 
If it seems as if VideoView is not connecting to the server, you can confirm that the server still works by attempting to connect with the offical VLC app on Android/ VLC media player on any device (we would be happy to demonstrate this to you in person).
We have analysed the rtsp streams published by the server with openRTSP, a command line tool that can be 
used to verify the integrity of rtsp streams, and received successful play requests.
If the libstreaming app fails to connect to the server, it is probably because the ANNOUNCE request was declined. 
If this is the case, then it means the formats between the Android device and the server are incompatible. This is a fundamental problem, because it would require going deep into the very complex world of encodings and trying to figure 
out where there are subtle differences in format between the Android Library's .h264 implementation and the server's 
.h264 implementation. Ideally, this should never happen as .h264 and .aac were designed to be highly portable. 
Again, you can verify that the server does at least successfully accept sources by streaming from any ffmpeg source with the command
ffmpeg -re -i input.mp4 -c:v libx264 -preset fast -c:a libfdk_aac -ab 128k -ar 44100 -f rtsp rtsp://localhost:80/live/STREAM_NAME
