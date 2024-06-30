import '../App.css';


const Intro = () =>{
    return (
        <>
            <div class="Btn-container">
                <a href="/login"><button class="w3-button w3-green w3-hover-black btn">Sign in</button></a>
                <a href="/registration"><button class="w3-button w3-green w3-hover-black btn">Sign up</button></a>
            </div>

            <div class="Intro-container">
                <h3>ReactJS And PHP CRUD SKU Maintaining App With Sign up and Sign in</h3>
                <div>
                    user 1:
                    <ul>
                        <li>johndoe@gmail.com</li>
                        <li>john@95</li>
                    </ul>
                </div>
                <div>
                    user 2:
                    <ul>
                        <li>janidoe@gmail.com</li>
                        <li>jani@95</li>
                    </ul>
                </div>
                <div>
                    user 3:
                    <ul>
                        <li>williamjohn@gmail.com</li>
                        <li>william@97</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Intro;