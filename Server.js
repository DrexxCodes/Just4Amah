const firebaseConfig = {
  apiKey: "AIzaSyCvjNJ3TgBk46KnEk8h45FgrSxpH4AkU4M",
  authDomain: "magis-mobile.firebaseapp.com",
  databaseURL: "https://magis-mobile-default-rtdb.firebaseio.com",
  projectId: "magis-mobile",
  storageBucket: "magis-mobile.appspot.com",
  messagingSenderId: "785911550272",
  appId: "1:785911550272:web:19bc22cfe25e837c516aa5",
  measurementId: "G-GH2DLRDENH"
};

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.database(app);

    function generateCode() {
        const refCode = 'TechNinja-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        document.getElementById('refCode').value = refCode;
        navigator.clipboard.writeText(refCode).then(() => {
            document.getElementById('message').innerText = ' Ref Code generated and copied to clipboard';
        });
    }

    function submitData() {
        const appName = document.getElementById('appName').value;
        const refCode = document.getElementById('refCode').value;

        if (appName && refCode) {
            db.ref('apps/' + refCode).set({
                appName: appName,
                timestamp: new Date().toISOString()
            }).then(() => {
                document.getElementById('message').innerText = 'Data submitted successfully';
                document.getElementById('appName').value = '';
                document.getElementById('refCode').value = '';
            }).catch((error) => {
                document.getElementById('message').innerText = 'Error: ' + error.message;
            });
        } else {
            document.getElementById('message').innerText = 'Please enter an app name and generate a reference code';
        }
    }

    function lookupApp() {
        const refCode = document.getElementById('retrieveRefCode').value;

        if (refCode) {
            db.ref('apps/' + refCode).once('value').then((snapshot) => {
                const appData = snapshot.val();
                if (appData) {
                    document.getElementById('retrievedAppName').value = appData.appName;
                    document.getElementById('retrievedAppGroup').style.display = 'block';
                } else {
                    document.getElementById('retrievedAppGroup').style.display = 'none';
                    alert('No App found');
                }
            }).catch((error) => {
                document.getElementById('retrievedAppGroup').style.display = 'none';
                alert('Error: ' + error.message);
            });
        } else {
            document.getElementById('retrievedAppGroup').style.display = 'none';
            alert('Please enter a reference code');
        }
    }

