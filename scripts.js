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

async function callingAPI() {
    let mainURL = "http://www.boredapi.com/api/activity?";

    //const formData = new FormData(
    //    document.querySelector('#INSERT_NAME_OF_FORM_HERE'),
    //    document.querySelector("button[value=NAME_OF_SUBMIT_BUTTON]")
    //);
    
    let accessibility = ''//Call from slider number
    let price = ''//Call from slider number
    let people = ''//Call from slider number
    let type = ''//Call type from dropdown

    /*for (const [key, value] of formData) {
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
            case 'dropdown':
                type = value;
                break;
            default:
                break;
        }
    }*/
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
    if (type !== '')
    {
        console.log(type);
        mainURL += `type=${type}`;
    }
    console.log(mainURL);
    fetch(mainURL)
        .then((response) => response.json())
        .then((data) => {
            if (data.error !== `No activity found with the specified parameters`) {
                const newActivity = new Activity(data.activity, data.type, data.participants, data.price, data.link, data.key, data.accessibility);
                console.log(newActivity);
                displayingResults(newActivity);
            }
            else {
                throw new Error(`Failed call`);
            }
        })
        .catch((error) => console.error(error));
}
callingAPI();
function displayingResults(activity) {
    //document.body.appendChild(activity);
}
