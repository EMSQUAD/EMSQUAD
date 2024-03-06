// import { useState, useEffect } from "react";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// export const pushDataNotifications = () => {
//   const [expoPushToken, setExpoPushToken] = useState("");

//   useEffect(() => {
//     console.log("Registering for push notifications...");
//     registerForPushNotificationsAsync()
//       .then((token) => {
//         console.log("token: ", token);
//         setExpoPushToken(token);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   async function registerForPushNotificationsAsync() {
//     let token;

//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     if (Device.isDevice) {
//       const { status: existingStatus } =
//         await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId: "1d5e21f2-3fb7-4320-bfdb-cb6459067336",
//         })
//       ).data;
//       console.log(token);
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     return token;
//   }

//   const sendNotification = async () => {
//     console.log("Sending push notification...");

//     const message = {
//       to: expoPushToken,
//       sound: "default",
//       title: "My first push notification!",
//       body: "This is my first push notification made with expo rn app",
//     };

//     await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         host: "exp.host",
//         accept: "application/json",
//         "accept-encoding": "gzip, deflate",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(message),
//     });
//     console.log("im here");
//   };

//   const sendData = async () => {
//     try {
//       console.log("Sending data...");
//       await sendNotification();
//       console.log("Push notification sent successfully");
//     } catch (error) {
//       console.error("Error sending push notification:", error);
//     }
//   };

//   return sendData;
// };




import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const pushDataNotifications = () => {
  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then(() => {
        console.log("Registration successful");
      })
      .catch((err) => console.log("Error registering for push notifications:", err));
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const expoPushToken = await Notifications.getExpoPushTokenAsync();
      console.log("Expo Push Token:", expoPushToken.data);
      // Fetch users from MongoDB and get their Expo Push Tokens
      const usersResponse = await fetch("https://server-ems-rzdd.onrender.com/user");
      const usersData = await usersResponse.json();
      const usersTokens = usersData.map(user => user.expoPushToken);
      console.log("Users Expo Push Tokens:", usersTokens);
      // Send notifications to each user
      await Promise.all(usersTokens.map(sendNotification));
      console.log("All notifications sent successfully");
    } else {
      alert("Must use physical device for Push Notifications");
    }
  }

  const sendNotification = async () => {
    console.log("Sending push notification to:");
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log("Notification sent to:", to);
  };

  return null;
};
