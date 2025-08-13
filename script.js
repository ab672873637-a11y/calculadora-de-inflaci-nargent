
// Inflation rates data (simplified for demo)
const inflationData = {
    1992: 1.0,
    2000: 2.5,
    2010: 15.8,
    2020: 150.2,
    2024: 300.5
};

// Calculate inflation
function calculateInflation() {
    const amount = document.getElementById('amount').value;
    const fromYear = document.getElementById('fromYear').value;
    const toYear = document.getElementById('toYear').value;
    const resultDiv = document.getElementById('result');

    if (!amount || amount <= 0) {
        alert('Por favor ingrese un monto válido');
        return;
    }

    const fromRate = inflationData[fromYear];
    const toRate = inflationData[toYear];
    
    if (!fromRate || !toRate) {
        alert('Año no válido');
        return;
    }

    const adjustedAmount = (amount * toRate) / fromRate;
    const inflationPercentage = ((toRate / fromRate - 1) * 100).toFixed(2);

    resultDiv.innerHTML = `
        <h3>Resultado del Cálculo</h3>
        <p><strong>Monto original:</strong> $${Number(amount).toLocaleString()} (${fromYear})</p>
        <p><strong>Monto ajustado:</strong> $${adjustedAmount.toLocaleString()} (${toYear})</p>
        <p><strong>Inflación acumulada:</strong> ${inflationPercentage}%</p>
        <p><em>*Cálculo basado en datos simplificados para demostración</em></p>
    `;
    
    resultDiv.style.display = 'block';
    
    // Add animation
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultDiv.style.transition = 'all 0.5s ease';
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Image upload functionality
let uploadedImages = [];

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Por favor seleccione un archivo de imagen válido');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB permitido.');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        
        // Show preview
        showImagePreview(imageUrl, file.name);
        
        // Add to gallery
        addToGallery(imageUrl, file.name);
        
        // Store in array
        uploadedImages.push({
            url: imageUrl,
            name: file.name,
            uploadDate: new Date().toLocaleDateString()
        });
    };
    
    reader.readAsDataURL(file);
}

function showImagePreview(imageUrl, fileName) {
    const previewDiv = document.getElementById('imagePreview');
    previewDiv.innerHTML = `
        <div class="preview-container">
            <h4>Vista Previa: ${fileName}</h4>
            <img src="${imageUrl}" alt="${fileName}" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <p style="margin-top: 10px; color: #666; font-style: italic;">Imagen cargada exitosamente</p>
        </div>
    `;
}

function addToGallery(imageUrl, fileName) {
    const galleryContainer = document.getElementById('galleryContainer');
    
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="${fileName}" onclick="viewFullImage('${imageUrl}', '${fileName}')">
        <div style="padding: 10px; background: white; text-align: center;">
            <p style="margin: 0; font-size: 0.9rem; color: #666; word-break: break-all;">${fileName}</p>
        </div>
    `;
    
    // Add animation
    galleryItem.style.opacity = '0';
    galleryItem.style.transform = 'scale(0.8)';
    
    galleryContainer.appendChild(galleryItem);
    
    // Animate in
    setTimeout(() => {
        galleryItem.style.transition = 'all 0.5s ease';
        galleryItem.style.opacity = '1';
        galleryItem.style.transform = 'scale(1)';
    }, 100);
}

function viewFullImage(imageUrl, fileName) {
    // Create modal for full image view
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    modal.innerHTML = `
        <div style="max-width: 90%; max-height: 90%; text-align: center;">
            <img src="${imageUrl}" alt="${fileName}" style="max-width: 100%; max-height: 100%; border-radius: 10px;">
            <p style="color: white; margin-top: 20px; font-size: 1.2rem;">${fileName}</p>
            <p style="color: #ccc; margin-top: 10px;">Haga clic para cerrar</p>
        </div>
    `;
    
    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});

// Add some interactive features
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 100);
    
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        calculateInflation();
    }
});
