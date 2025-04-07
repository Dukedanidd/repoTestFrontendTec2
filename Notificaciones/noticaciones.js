class EventManager {
    constructor() {
            // Almacena los suscriptores organizados por tipo de evento
            this.subscribers = {};
        }
        // Método para suscribir funciones (callbacks) a un evento
    subscribe(event, callback) {
            // Si el evento no tiene suscriptores, inicializa un array vacío
            if (!this.subscribers[event]) {
                this.subscribers[event] = [];
            }
            // Agrega la función de callback al array de suscriptores del evento
            this.subscribers[event].push(callback);
        }
        // Método para notificar a todos los suscriptores de un evento
    notify(event, data) {
        // Si existen suscriptores para este evento, ejecuta cada callback
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback(data));
        }
    }
}

// Mostrar las notificaciones con Bootstrap

class NotificationSystem {
    constructor(eventManager) {
            // Guarda la referencia al EventManager para escuchar eventos
            this.eventManager = eventManager;
            // Se suscribe al evento 'newNotification' y usa bind() para mantener el contexto
            this.eventManager.subscribe("newNotification",
                this.showNotification.bind(this));
        }
        // Muestra una notificación tipo toast
    showNotification(message) {
        // Selecciona el contenedor donde se agregarán las notificaciones
        const toastContainer = document.getElementById("toast-container");
        // Crea un nuevo toast con la estructura de Bootstrap
        const toast = document.createElement("div");
        toast.className = "toast show align-items-center text-bg-primary border - 0 ";
        toast.role = "alert";
        toast.innerHTML = `
    <div class="d-flex">
    <div class="toast-body">${message}</div>
    <button type="button" class="btn-close me-2 m-auto" data-bsdismiss="toast"></button>
    </div>
    `;
        // Agrega el toast al contenedor
        toastContainer.appendChild(toast);
        // Elimina el toast después de 3 segundos
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Contador de notificaciones