// Add this function at the beginning of the file
function initializeApp() {
  // Initialize all functionality
  setupEventListeners()
  checkLiveStatus()
}

// Add this function to setup all event listeners
function setupEventListeners() {
  // Links externos para pagamentos
  const externalLinks = {
    "1month": "https://your-payment-link-for-1month.com",
    "3months": "https://your-payment-link-for-3months.com",
    "6months": "https://your-payment-link-for-6months.com",
  }

  // Elements
  const readMoreBtn = document.getElementById("read-more-btn")
  const bioText = document.getElementById("bio-text")
  const socialButtons = document.querySelectorAll(".social-btn")
  const subscriptionAlertModal = document.getElementById("subscription-alert-modal")
  const subscriptionButtons = document.querySelectorAll(".subscription-btn")

  // Setup subscription buttons
  subscriptionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planId = button.id.replace("plan-", "")
      handleSubscriptionClick(planId)
    })
  })

  // Setup other interactive elements
  const lockedElements = document.querySelectorAll('[onclick="scrollToSubscription()"]')
  lockedElements.forEach((element) => {
    element.addEventListener("click", scrollToSubscription)
  })
}

// Function to check and update live status
function checkLiveStatus() {
  // This would normally fetch from an API
  console.log("Checking live status of models...")
  // For now we're using the hardcoded values in the HTML
}

// Links externos para pagamentos
const externalLinks = {
  "1month": "https://your-payment-link-for-1month.com",
  "3months": "https://your-payment-link-for-3months.com",
  "6months": "https://your-payment-link-for-6months.com",
}

// Elementos DOM
const readMoreBtn = document.getElementById("read-more-btn")
const bioText = document.getElementById("bio-text")
const bioTextExpanded = document.getElementById("bio-text-expanded")
const socialButtons = document.querySelectorAll(".social-btn")
const subscriptionAlertModal = document.getElementById("subscription-alert-modal")
const lockedElements = document.querySelectorAll('[onclick="scrollToSubscription()"]')

// Função para alternar a exibição da biografia
if (readMoreBtn) {
  readMoreBtn.addEventListener("click", () => {
    if (bioText.classList.contains("hidden")) {
      bioText.classList.remove("hidden")
      bioTextExpanded.classList.add("hidden")
      readMoreBtn.textContent = "Ler mais"
    } else {
      bioText.classList.add("hidden")
      bioTextExpanded.classList.remove("hidden")
      readMoreBtn.textContent = "Mostrar menos"
    }
  })
}

// Função para rolar até a seção de assinatura
function scrollToSubscription() {
  const subscriptionSection = document.getElementById("subscription-section")
  const firstPlanButton = document.getElementById("plan-1month")

  if (subscriptionSection) {
    subscriptionSection.scrollIntoView({ behavior: "smooth" })

    if (firstPlanButton) {
      firstPlanButton.classList.add("ring-4", "ring-orange-300")
      setTimeout(() => {
        firstPlanButton.classList.remove("ring-4", "ring-orange-300")
      }, 2000)
    }
  }
}

// Função para lidar com cliques nos botões de assinatura
function handleSubscriptionClick(planId) {
  window.location.href = externalLinks[planId]
}

// Função para abrir o modal de alerta de assinatura
function openSubscriptionModal() {
  if (subscriptionAlertModal) {
    subscriptionAlertModal.classList.add("active")
  }
}

// Função para fechar o modal de alerta de assinatura
function closeSubscriptionModal() {
  if (subscriptionAlertModal) {
    subscriptionAlertModal.classList.remove("active")
  }
}

// Adicionar event listeners para os botões de redes sociais
if (socialButtons) {
  socialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openSubscriptionModal()
    })
  })
}

// Call initialize when the script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}
