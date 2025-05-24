
// function to render reusable components in index page

function renderReusableComponents(pageUrl , selector){

    try{

        const targetElement = document.querySelector(selector);

        if(!targetElement){

            throw new Error("target element not found");
        }

        const getComponentHtml = fetch(`components/${pageUrl}`);
            
        getComponentHtml.then((response) => {

            if(!response.ok){
                    
                throw new Error(`${response.status} Error Occurred`);
            }

            const result = response.text();

            return result;

        }).then((componentHtml) => {

            targetElement.innerHTML = componentHtml;
        })
        .catch((error) => {

        console.log(error.message);

            
        })

    }
    catch(error){

        console.log(error.message);
    }
    
}

// renderReusableComponents(component url , element tagName or className or Id);

renderReusableComponents("top-header/top-header.html" , "#header-section");

renderReusableComponents("footer/footer.html" , "#footer-section");

renderReusableComponents("sidebar/sidebar.html" , "#sidebar-section");

renderReusableComponents("navbar/navbar.html" , "#navbar-section");


// waiting for the sidebar to load properly //

setTimeout(() => {

    // dynamic nav section //

    const navItems = ["home" , "about us" , "gallery" , "contact us"];

    
    let noStyle = "";

    // function to make nav section dynamic //

    const navSection = (style , selector) => {

        try{

            const targetElement = document.querySelector(selector);

            if(!targetElement){

                throw new Error("target element not found");
            }

            navItems.forEach(navItem => {

                const newPageLinks = document.createElement("a");

                newPageLinks.innerText = navItem;

                newPageLinks.setAttribute("href" , "");

                newPageLinks.setAttribute("data-name" , navItem);

                const newPageItems = document.createElement("li");

                if(style === "vertical" && selector === ".sidebar"){

                    newPageLinks.classList.add("page-links");

                    newPageItems.classList.add("page-items");

                    newPageItems.append(newPageLinks);

                    targetElement.append(newPageItems);

                }

                else if(style === "horizontal" && selector === ".Navbar"){

                    newPageLinks.classList.add("nav-links");

                    newPageLinks.classList.remove("page-links");

                    newPageItems.classList.add("nav-items");

                    newPageLinks.classList.remove("page-items");

                    newPageItems.append(newPageLinks);

                    targetElement.append(newPageItems);

                }

                else{

                    noStyle = "Please enter correct style as horizontal or vertical";
                }

            })
        
            console.log(noStyle);

        }

        catch(error){

            console.log(error.message);
        }
    }

    navSection("vertical" , ".sidebar");

    navSection("horizontal" , ".Navbar");

} , 100)


// function when windows load home page appears //

const mainContent = document.querySelector("#main-section");

async function loadPage(url){

    try{

        const response = await fetch(`pages/${url}`);
        
        if(!response.ok){

            throw new Error(`${response.status} Error Has Been Occurred!`);
        }

        const homeHtml = await response.text();

        mainContent.innerHTML = homeHtml ;

    }

    catch(error){

        console.log(error.message);
    }
}


loadPage("home/home.html")


// handle different page contents on navbar click //



function handleNavbarEvent(selector){

    try{

        const targetElement = document.querySelector(selector);

        if(!targetElement){

            throw new Error("target element not found");
        }

        targetElement.addEventListener("click" , function(event){

            event.preventDefault();

            if(event.target.classList.contains("nav-links") || event.target.classList.contains("page-links")){

                const pageName = event.target.dataset.name;

                loadPage(`${pageName}/${pageName}.html`);
            }

        });

    }

    catch(error){

        console.log(error.message);
    }
}


handleNavbarEvent("#navbar-section")

handleNavbarEvent("#sidebar-section")