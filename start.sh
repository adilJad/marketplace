#!/bin/sh

app=com.mobile.marketplace

pathToAPK=platforms/android/build/outputs/apk/android-debug.apk

echo "Installing plugins & platform from package.json"
ionic state restore

echo "Running Ionic Build"
ionic build

echo "Started to loop over the connected android devices"
for SERIAL in $(adb devices | grep -v List | cut -f 1);
	do

		echo " Uninstalling the app from the phone "
		adb -s $SERIAL shell pm uninstall $app
		echo " Clearing any local data stored with this app on the phone "
		adb -s $SERIAL shell pm clear $app
		echo " Installing the app on the phone "
		adb -s $SERIAL install -r platforms/android/build/outputs/apk/android-debug.apk
		echo " Launching the app on the phone "
		adb -s $SERIAL shell monkey -p $app -c android.intent.category.LAUNCHER 1
done