class Activity {
    constructor(name, type, participants, price, link, key, accessibility) {
        this.name = name;
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
    check = false;
    removeElements();
    callingAPI();
    setTimeout(displayingResults, 2500);

});
let Activities = [];

const divList = document.getElementById("activityList");

let check = false;

async function callingAPI() {
    Activities = [];
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
    if (type !== 'no preference') {
        console.log(type);
        mainURL += `type=${type}`;
    }
    console.log(mainURL);

    let cycle = 0

    do {
        if (check) {
            cycle = 99;
            break;
        }
        fetch(mainURL)
            .then((response) => response.json())
            .then((data) => {
                if (Activities.map((k) => k.key).indexOf(data.key) !== -1 && Activities.length > 1) {
                    Activities.pop();
                    check = true;
                    throw new Error('Repeated call');

                } else if (data.error !== `No activity found with the specified parameters`) {
                    const newActivity = new Activity(data.activity, data.type, data.participants, data.price, data.link, data.key, data.accessibility);
                    if (!Activities.includes(newActivity)) {
                        Activities.push(newActivity);
                    }
                }
                else {
                    check = true;
                    throw new Error(`Failed call`);
                }
            }).catch((error) => {
                console.error(error);
            });
        cycle++;
    } while (cycle < 3)
    console.log(Activities);
}
//callingAPI();
function removeElements() {
    while (divList.firstChild) {
        divList.removeChild(divList.firstChild);
    }
    console.log(divList);
}

async function displayingResults() {
    //document.body.appendChild(activity);    
    if (check) {
        alert("Error occured");
        return;
    }
    for (const activity of Activities) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', "calledActivity");
        divList.appendChild(newDiv);
        let activityName = document.createElement('h3');
        activityName.textContent = activity.name;
        newDiv.appendChild(activityName);

        const ul = document.createElement('ul');
        newDiv.appendChild(ul);

        if (activity.link !== '') {
            const liLink = document.createElement('li');
            const hyperlink = document.createElement('a');
            hyperlink.setAttribute('href', activity.link);
            hyperlink.setAttribute('target', '_blank');
            hyperlink.textContent = activity.link;
            liLink.appendChild(hyperlink);
            ul.appendChild(liLink);
        }

        const liType = document.createElement('li');
        liType.textContent = `Type of Activity: ${activity.type}`;
        ul.appendChild(liType);

        const liPrice = document.createElement('li');
        liPrice.textContent = `Price of the activity: ${activity.price}`;
        ul.appendChild(liPrice);

        const liParticipants = document.createElement('li');
        liParticipants.textContent = `Number of people for the activity: ${activity.participants}`;
        ul.appendChild(liParticipants);

        const liAccessibility = document.createElement('li');
        liAccessibility.textContent = `Accessibility valued at: ${activity.accessibility}`;
        ul.appendChild(liAccessibility);
    }
}
