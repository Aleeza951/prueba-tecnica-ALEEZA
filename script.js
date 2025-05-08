document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM fully loaded');
  
      // DOM Elements 
      const loginForm = document.getElementById('loginFormElement');
      const registerForm = document.getElementById('registerFormElement');
      const loginBtn = document.querySelector('.login');
      const registerBtn = document.querySelector('.register');
      const loginModal = document.getElementById('loginModal');
      const registerModal = document.getElementById('registerModal');
      const loginCloseBtn = document.getElementById('loginCloseBtn');
      const registerCloseBtn = document.getElementById('registerCloseBtn');
      const switchToRegister = document.getElementById('switchToRegister');
      const switchToLogin = document.getElementById('switchToLogin');
  
      function openModal(modal) {
          modal.style.display = 'block';
      }
  
      function closeModal(modal) {
          modal.style.display = 'none';
      }
  
      function togglePasswordVisibility(icon) {
          const inputId = icon.getAttribute('data-target');
          const passwordInput = document.getElementById(inputId);
  
          const isHidden = passwordInput.type === 'password';
          passwordInput.type = isHidden ? 'text' : 'password';
          icon.classList.toggle('fa-eye-slash', !isHidden);
          icon.classList.toggle('fa-eye', isHidden);
      }
  
      function showLogoutButton() {
          if (!document.querySelector('.logout')) {
              const logoutBtn = document.createElement('button');
              logoutBtn.className = 'button logout';
              logoutBtn.textContent = 'Logout';
              logoutBtn.addEventListener('click', () => {
                  localStorage.removeItem('currentUser');
                  location.reload();
              });
              document.querySelector('.buttons').appendChild(logoutBtn);
          }
      }

      function hideLoginRegisterButtons() {
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
        }
    
        // Open modals
        loginBtn.addEventListener('click', () => openModal(loginModal));
        registerBtn.addEventListener('click', () => openModal(registerModal));
    
        // Close modals
        loginCloseBtn.addEventListener('click', () => closeModal(loginModal));
        registerCloseBtn.addEventListener('click', () => closeModal(registerModal));
    
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    
        // Toggle password show/hide
        document.querySelectorAll('.toggle-password').forEach(icon => {
            icon.addEventListener('click', () => togglePasswordVisibility(icon));
        });
    
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) closeModal(loginModal);
            if (e.target === registerModal) closeModal(registerModal);
        });

        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Login form submitted');
                
                // Check which input element exists
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('loginEmail');
                
                // Use whichever input exists
                const username = nameInput ? nameInput.value : (emailInput ? emailInput.value : '');
                const password = document.getElementById('loginPassword').value;
                
                console.log('Entered:', username, password);
                
                // Specific username and password
                const correctUsername = "aleeza";
                const correctPassword = "12345";
                
                if (username === correctUsername && password === correctPassword) {
                    console.log('Login successful');

                    const userData = { username: username };
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    
                    alert(`Welcome back, Aleeza!`);
                    
                    hideLoginRegisterButtons();
                    showLogoutButton();
                    
                    closeModal(loginModal);
                    loginForm.reset();
                } else {
                    console.log('Login failed');
                    alert('Invalid username or password. Please try again.');
                }
            });
        } else {
            console.error('Login form element not found! Check the ID in your HTML.');
        }
    
        // ======= Register Form Submission =======
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('registerEmail').value;
    
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userExists = users.some(user => user.email === email);
    
                if (userExists) {
                    alert('This email is already registered.');
                    return;
                }
    
                users.push({ firstName, lastName, email });
                localStorage.setItem('users', JSON.stringify(users));
    
                alert('Registration successful! You can now log in.');
                registerForm.reset();
                closeModal(registerModal);
            });
        }
    
        // ======= Show logged-in user UI if already logged in =======
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            hideLoginRegisterButtons();
            showLogoutButton();
        }
    
        // ======= Feature Image Hover Effect =======
        function setupFeatureImageHover() {
            const featureContainer = document.querySelector('.feature-image-container');
            if (!featureContainer) return;
            
            const img = featureContainer.querySelector('.feature-img');
            const primarySrc = featureContainer.getAttribute('data-primary');
            const secondarySrc = featureContainer.getAttribute('data-secondary');
            
            if (!primarySrc || !secondarySrc) return;
            
            img.src = primarySrc;
            
            const preloadImg = new Image();
            preloadImg.src = secondarySrc;
            
            // Mouse enter - change to secondary image with zoom effect
            featureContainer.addEventListener('mouseenter', () => {
                img.style.opacity = '0.8';
                
                setTimeout(() => {
                    img.src = secondarySrc;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1.05)';
                }, 200);
            });
            
            featureContainer.addEventListener('mouseleave', () => {
                img.style.opacity = '0.8';
                
                setTimeout(() => {
                    img.src = primarySrc;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 200);
            });
            
            console.log('Feature image hover effect initialized');
        }
            setupFeatureImageHover();
    });
    
    // ======= Date and Time Display =======
    function updateDateTime() {
        const now = new Date();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[now.getDay()];
        
        const date = now.getDate();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        
        // Get time
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
    
        const dateTimeString = `${dayName}, ${monthName} ${date}, ${year} | ${hours}:${minutes}:${seconds} ${ampm}`;
        
        const dateTimeElement = document.getElementById('current-date-time');
        if (dateTimeElement) {
            dateTimeElement.textContent = dateTimeString;
        }
    }
    
 
    function startClock() {
        updateDateTime(); 
        setInterval(updateDateTime, 1000); 
    }

    document.addEventListener('DOMContentLoaded', () => {
        
        startClock();
        
    });