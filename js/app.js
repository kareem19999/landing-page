/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * @description This function builds the navigation bar using section tag and id of navbar
 * @constructor
*/
let buildNavBar =() =>
{
    
    let sectionName=[];
    let sectionID=[];
    //This gets all available sections
    sections= document.querySelectorAll('section');
    navBarList=document.getElementById('navbar__list'); 
    //Use dataset using forEach to extract section names and IDs.
    //Section names are needed for the name of the headings.
    //SectionIDs are needed for anchors to the actual sections using their ID
    for(section of sections)
    {
        sectionName.push(section.dataset.nav);
        sectionID.push(section.id);
    }

    //Create list item for every section discovered
    //For is used instead of for-of as we need to access two arrays
    //This also sets a certain button to be active based on class of section
    //Regular for is needed here as index was needed to be used
    for(let i=0 ;i< sectionName.length;i++)
    {
        //Each li element containing an href, textContent and event
        const newElement=document.createElement('li');
        newElement.textContent=sectionName[i];
        newElement.setAttribute('onClick',`location.href="#${sectionID[i]}"`);
        newElement.addEventListener('click',()=>
        {
            
            for(element of sections)
            {        
                changeClass(element,element.dataset.nav,this.textContent);
            }
        }
        );
        navBarList.appendChild(newElement);
    }
    //document.appendChild(navBarList);
    //This should change the active section button to active state

}
/**
 * @description This function modifies the navBar (Set active and inactive) based on which section was clicked or where scroll leads to
 * @constructor
*/
let activateNav =() =>
{
    navBarList.addEventListener('click',modifyNav);
    document.addEventListener('scroll',modifyNav);

}
/**
 * @description This function modifies the active section based on which is closest to viewport.
 * @constructor
*/
let  sectionActive = () =>
{
    document.addEventListener('scroll',()=>
    {
        const currentH=window.pageYOffset; //This line gets current offset in Y
        let difference;
        let minDiff=9999; //In order to get the minimum, a big number is initialized for difference
        //This obtains the minimum offset from current window and section offset
        for(section of sections)
        {
            difference=Math.abs(currentH-section.offsetTop);
            if(difference< minDiff)
            {
                minDiff=difference;
            }
        }
        //This sets the closest class to active, the others will have class active removed
        for(section of sections)
        {
            difference=Math.abs(currentH-section.offsetTop);
            changeClass(section,difference,minDiff);
        }
    })

}
//Limitation: The timeout is invoked each time a scroll is recorded.
/**
 * @description This function shows/hides nav based on scroll and delay which is defined as constant
 * @constructor
*/
let  hideShowNav = () =>
{
    document.addEventListener('scroll',
    function()
{
    let scrollCheck;
    let navBar=document.getElementById('navbar__list');
    navBar.style.display='block';
    clearTimeout(scrollCheck);
    scrollCheck=setTimeout(()=>
    {
        navBar.style.display='none';
    },TIMEOUT); //Hides navbar when not scrolling
}
    );

}
/**
 * @description This function modifies the functionality of "Scroll to top button" and determines whether to show/hide it
 * @constructor
*/
let scrollButton = () =>
{
    let windowSize=window.screen.height; //Gets total height of screen (Ensure all device compatability)
    let scrollButton=document.getElementById('scrollButton')
    //This should show the button if the scroll is greater than the window size
    document.addEventListener('scroll',()=>
    {
        if(windowSize < window.pageYOffset)
        {
            scrollButton.style.display='block';
        }else
        {
            scrollButton.style.display='none';
        }
    });
    //Smooth transition to top when clicked
    scrollButton.addEventListener('click',()=>
    {
        window.scroll({left:0, top:0, behavior: 'smooth'});
    });
}
/**
 * @description This function collapses/expands the sections when clicked. However, it is assumed that children of the div are only "p"
 * @constructor
*/
let collapseSection = () =>
{
    for(section of sections)
    {
        let divs= section.querySelector('div').getElementsByTagName('p');
        section.addEventListener('click',()=>
        {
            for(div of divs)
            {
                //This toggles hiding/unhiding
                if(div.style.display=='none')
                {
                    div.style.display='block';
                }else
                {
                    div.style.display='none';
                }
            }
        });
    }
}
/**
 * @description This is a helper function to change the class to active/inactive whenever click on navigation bar or scroll
 * @constructor
 * @param {element} index This is the element which is to be checked to enable/disable class
 * @param {number} Eq1 As this function is used in For..Of loops, it is needed to enable ONLY ONE section, so both operands should be equal.
 * @param {number} Eq1 As this function is used in For..Of loops, it is needed to enable ONLY ONE section, so both operands should be equal
*/
let changeClass = (index, Eq1, Eq2) =>
{
        if(Eq1 == Eq2)
        {
            index.className='your-active-class';
        }
        else
        {
            index.classList.remove("your-active-class");
        }
}
/**
 * @description This modifies the class of the navBar active item based on the active section
 * @constructor
*/
let modifyNav =() =>
{
    for(let i=0; i<sections.length; i++)
    {
        if(sections[i].className== "your-active-class")
        {
            navBarList.children[i].classList="active";
        }
        else
        {
            navBarList.children[i].classList.remove("active");
        }
    }
}


let sections= '';
let navBarList= '';
const TIMEOUT=4000; //Set timeout as 4 seconds

// build the nav
let start=performance.now();
buildNavBar();
scrollButton();
sectionActive();
activateNav();
hideShowNav();
collapseSection();
let end=performance.now();
let diff=end-start;
console.log(`performance is ${diff}`);

