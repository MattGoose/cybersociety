Follow this README to get the android emulator and Cyber Society app running

Go to this link: https://reactnative.dev/docs/environment-setup
Click the 'React Native CLI Quickstart' tab
Select Android as the Target OS
Follow the instructions UNTIL 'Creating a new application'
Skip 'Creating a new application' and go to 'Preparing the Android device'
Follow the instructions for either physical or virtual device setup (the author reccommends virtual if you do not own an Android device)
Ignore the rest of the React Native documentation and follow the rest of this README
In your code editor of choice (the author used Visual Studio Code), using the command line interface, navigate to the devcs folder
    Alternatively, right-click the devcs project and open it in your editor and the command line interface should already be in the devcs fodler
Run 'adb devices' in the command line
If there are no options listed beneath 'List of devices attached' wait several minutes and try again
When an emulator is listed (which may look something like 'emulator-5580 offline') run 'react-native run-android' in the command line
Wait for Cyber Society to load
Voila! Cyber Society is ready for use