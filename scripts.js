class Activity {
    constructor(activityCalled, type, participants, price, link, key, accessibility) {
        this.activityCalled = activityCalled;
        this.type = type;
        this.participants = participants;
        this.price = price;
        this.link = link;
        this.key = key;
        this.accessibility = accessibility;
    }
    checkRepeats(calledObject) {
        if (this.key === calledObject.key)
            return true; // if repeated value
        return false; // if not repeated value
    }
}
const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    callingAPI();
});
let Activities = [];
async function callingAPI() {
    let mainURL = "http://www.boredapi.com/api/activity?";
    let formData = new FormData(
        document.querySelector('#boredAPIForm'),
        document.querySelector("button[value=submit]")
    );
    let accessibility = ''//Call from slider number
    let price = ''//Call from slider number
    let people = ''//Call from slider number
    let type = ''//Call type from dropdown

    for (const [key, value] of formData) {
        switch (key) {
            case 'slider1':
                accessibility = value;
                break;
            case 'slider2':
                price = value;
                break;
            case 'slider3':
                people = value;
                break;
            case 'type':
                type = value;
                break;
            default:
                break;
        }
    }
    if (accessibility > 0) {
        console.log(accessibility);
        mainURL += `maxaccessibility=${accessibility}&`;
    }
    if (price > 0) {
        console.log(price);
        mainURL += `maxprice=${price}&`;
    }
    if (people > 0) {
        console.log(people);
        mainURL += `participants=${people}&`;
    }
    console.log(type);
    if (type !== 'no preference') {
        console.log(type);
        mainURL += `type=${type}`;
    }
    console.log(mainURL);

    let cycle = 0
    let check = false;
    do {
        fetch(mainURL)
            .then((response) => response.json())
            .then((data) => {
                if (Activities.map((k) => k.key).indexOf(data.key) !== -1 && Activities.length > 1) {
                    check = true;
                    Activities.pop();
                    throw new Error('Repeated call');

                } else if (data.error !== `No activity found with the specified parameters`) {
                    const newActivity = new Activity(data.activity, data.type, data.participants, data.price, data.link, data.key, data.accessibility);

                    Activities.push(newActivity);
                    displayingResults(newActivity);
                }
                else {
                    throw new Error(`Failed call`);
                }
            }).catch((error) => { console.error(error) });
        if (check) {
            break;
        }
        cycle++;
    } while (cycle < 3)                    
    console.log(Activities);
}
//callingAPI();
function displayingResults(activity) {
    //document.body.appendChild(activity);
    for (const activity of Activities) {

    }
}
