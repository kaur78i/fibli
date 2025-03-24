export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
];

export const languageCodes = languages.map(lang => lang.code);

// Default translations
const translations = {
  en: {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    success: 'Success',
    error: 'Error',
    deleteConfirmation: 'Are you sure you want to delete this story?',
    deleteConfirmationMessage: 'This action cannot be undone.',
    loadingStory: 'Loading your stories...',
    errorGettingStory: 'Error getting story. Please try again.',
    generatingStory: 'Creating your story...',
    oops: 'Oops!',
    thisScreenDoesNotExist: 'This screen doesn\'t exist.',
    goToHomeScreen: 'Go to home screen!',
    yourFavorites: 'Your Favorites:',

    // Tabs
    newStory: 'New Story',
    myLibrary: 'My Library',
    settings: 'Settings',

    // Story Creation
    createNewStory: 'Create a New Story',
    enterTitle: 'Enter a story title...',
    storyTitleHint: 'Enter a title or speak to create your bedtime story',
    exampleTitle: 'Try these examples:',
    storyPreview: 'Story Preview',
    startGeneration: 'Start Generation',

    // Story Edit
    storyTitle: 'Story Title',
    enterStoryTitle: 'Enter a story title...',
    chapterNumber: 'Chapter',
    chapterTitle: 'Chapter Title',
    enterChapterTitle: 'Enter a chapter title...',
    chapterContent: 'Chapter Content',
    enterChapterContent: 'Enter the content for this chapter...',
    titleCannotBeEmpty: 'Title cannot be empty',
    failedToSaveChanges: 'Failed to save changes',
    storyUpdatedSuccessfully: 'Story updated successfully',

    // Story Settings
    storyLength: 'Story Length',
    short: 'Short',
    medium: 'Medium',
    long: 'Long',
    ageRange: 'Age Range',
    years: 'years',
    storyMood: 'Story Mood',
    happy: 'Happy',
    adventurous: 'Adventurous',
    educational: 'Educational',
    calming: 'Calming',
    magical: 'Magical',

    // Library
    librarySubtitle: 'Your personal collection of bedtime stories',
    emptyLibrary: 'Your library is empty. Create your first story!',
    chapters: 'chapters',
    min: 'min',

    // Story Reader
    chapter: 'Chapter',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    autoplayOn: 'Autoplay ON',
    autoplayOff: 'Autoplay OFF',
    resume: 'Resume',
    pause: 'Pause',
    reset: 'Reset',
    startReading: 'Start Reading',
    stopReading: 'Stop Reading',

    // Settings
    appSettings: 'App Settings',
    language: 'Language',
    appearance: 'Appearance',
    speechSettings: 'Speech Settings',
    speechRate: 'Speech Rate',
    slow: 'Slow',
    normal: 'Normal',
    fast: 'Fast',
    speechPitch: 'Speech Pitch',
    low: 'Low',
    high: 'High',
    about: 'About',
    version: 'Version',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemDefault: 'System Default',
    support: 'Support & Help',
    upgradeToPro: 'Upgrade to Pro',
    bestValue: 'BEST VALUE',
    monthlyUnlimited: 'Monthly Unlimited',
    active: 'Active',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Unlimited premium stories\n• Priority support\n• Access to all premium features\n• Cancel anytime',
    twentyUsesPackage: '20 Uses Package',
    twentyUsesPackageDescription: '• Get 20 premium stories\n• No monthly commitment\n• Access to all premium features',

    // Purchase Modal
    chooseYourPlan: 'Choose Your Plan',
    selectThePerfectPlanForYou: 'Select the perfect plan for you',
    monthlyBilling: 'Monthly billing',
    annualBilling: 'Annual billing',
    processing: 'Processing...',
    purchase: 'Purchase',
  },

  es: {
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    success: 'Success',
    error: 'Error',
    deleteConfirmation: '¿Estás seguro de querer eliminar esta historia?',
    deleteConfirmationMessage: 'Esta acción no se puede deshacer.',
    loadingStory: 'Cargando tus historias...',
    generatingStory: 'Creando tu historia...',
    errorGettingStory: 'Error al cargar la historia. Por favor, inténtelo de nuevo.',
    oops: '¡Oops!',
    thisScreenDoesNotExist: 'Esta pantalla no existe.',
    goToHomeScreen: '¡Vuelve al inicio!',
    yourFavorites: 'Tus Favoritos:',
    // Tabs
    newStory: 'Nueva Historia',
    myLibrary: 'Mi Biblioteca',
    settings: 'Ajustes',

    // Story Creation
    createNewStory: 'Crear una Nueva Historia',
    enterTitle: 'Introduce un título para la historia...',
    storyTitleHint: 'Escribe un título o habla para crear tu cuento para dormir',
    exampleTitle: 'Prueba estos ejemplos:',
    storyPreview: 'Vista previa de la historia',
    startGeneration: 'Iniciar generación',

    // Story Edit
    storyTitle: 'Título de la historia',
    enterStoryTitle: 'Introduce un título para la historia...',
    chapterNumber: 'Capítulo',
    chapterTitle: 'Título del capítulo',
    enterChapterTitle: 'Introduce un título para este capítulo...',
    chapterContent: 'Contenido del capítulo',
    enterChapterContent: 'Introduce el contenido para este capítulo...',
    titleCannotBeEmpty: 'El título no puede estar vacío',
    storyUpdatedSuccessfully: 'Historia actualizada correctamente',
    failedToSaveChanges: 'Error al guardar los cambios',

    // Story Settings
    storyLength: 'Duración de la historia',
    short: 'Corta',
    medium: 'Media',
    long: 'Larga',
    ageRange: 'Rango de edad',
    years: 'años',
    storyMood: 'Ambiente de la historia',
    happy: 'Feliz',
    adventurous: 'Aventurero',
    educational: 'Educativo',
    calming: 'Relajante',
    magical: 'Mágico',

    // Library
    librarySubtitle: 'Tu colección personal de cuentos para dormir',
    emptyLibrary: '¡Tu biblioteca está vacía. Crea tu primera historia!',
    chapters: 'capítulos',
    min: 'min',

    // Story Reader
    chapter: 'Capítulo',
    of: 'de',
    previous: 'Anterior',
    next: 'Siguiente',
    autoplayOn: 'Reproducción automática ON',
    autoplayOff: 'Reproducción automática OFF',
    resume: 'Reanudar',
    pause: 'Pausa',
    reset: 'Reiniciar',
    startReading: 'Comenzar Lectura',
    stopReading: 'Detener Lectura',

    // Settings
    appSettings: 'Ajustes de la aplicación',
    language: 'Idioma',
    appearance: 'Apariencia',
    speechSettings: 'Ajustes de voz',
    speechRate: 'Velocidad de voz',
    slow: 'Lenta',
    normal: 'Normal',
    fast: 'Rápida',
    speechPitch: 'Tono de voz',
    low: 'Bajo',
    high: 'Alto',
    about: 'Acerca de',
    version: 'Versión',
    privacyPolicy: 'Política de privacidad',
    termsOfService: 'Términos de servicio',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    systemDefault: 'Predeterminado del sistema',
    support: 'Soporte & Ayuda',
    upgradeToPro: 'Actualizar a Pro',
    bestValue: 'MEJOR VALOR',
    monthlyUnlimited: 'Ilimitado Mensual',
    active: 'Activo',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Historias premium ilimitadas\n• Soporte prioritario\n• Acceso a todas las características premium\n• Cancelar en cualquier momento',
    twentyUsesPackage: 'Paquete de 20 Usos',
    twentyUsesPackageDescription: '• Obtén 20 historias premium\n• Sin compromiso mensual\n• Acceso a todas las características premium',

    // Purchase Modal
    chooseYourPlan: 'Elige tu plan',
    selectThePerfectPlanForYou: 'Selecciona el plan perfecto para ti',
    monthlyBilling: 'Mensual',
    annualBilling: 'Anual',
    processing: 'Procesando...',
    purchase: 'Comprar',
  },

  fr: {
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    success: 'Succès',
    error: 'Erreur',
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer cette histoire?',
    deleteConfirmationMessage: 'Cette action ne peut pas être annulée.',
    loadingStory: 'Chargement de vos histoires…',
    generatingStory: 'Création de votre histoire magique…',
    oops: 'Oops!',
    thisScreenDoesNotExist: 'Cette écran n\'existe pas.',
    goToHomeScreen: 'Retour à l\'accueil!',
    yourFavorites: 'Vos Favoris:',

    // Tabs
    newStory: 'Nouvelle Histoire',
    myLibrary: 'Ma Bibliothèque',
    settings: 'Paramètres',

    // Story Creation
    createNewStory: 'Créer une Nouvelle Histoire',
    enterTitle: 'Entrez un titre d\'histoire...',
    storyTitleHint: 'Entrez un titre ou parlez pour créer votre histoire du coucher',
    exampleTitle: 'Essayez ces exemples:',
    storyPreview: 'Aperçu de l\'histoire',
    startGeneration: 'Commencer la génération',

    // Story Edit
    storyTitle: 'Titre de l\'histoire',
    enterStoryTitle: 'Entrez un titre d\'histoire...',
    chapterNumber: 'Chapitre',
    chapterTitle: 'Titre du chapitre',
    enterChapterTitle: 'Entrez un titre pour ce chapitre...',
    chapterContent: 'Contenu du chapitre',
    enterChapterContent: 'Entrez le contenu pour ce chapitre...',
    titleCannotBeEmpty: 'Le titre ne peut pas être vide',
    storyUpdatedSuccessfully: 'Histoire mise à jour avec succès',
    failedToSaveChanges: 'Erreur lors de la sauvegarde des modifications',
    errorGettingStory: 'Erreur lors du chargement de l\'histoire. Veuillez réessayer.',
    // Story Settings
    storyLength: 'Longueur de l\'histoire',
    short: 'Courte',
    medium: 'Moyenne',
    long: 'Longue',
    ageRange: 'Tranche d\'âge',
    years: 'ans',
    storyMood: 'Ambiance de l\'histoire',
    happy: 'Joyeuse',
    adventurous: 'Aventureuse',
    educational: 'Éducative',
    calming: 'Apaisante',
    magical: 'Magique',

    // Library
    librarySubtitle: 'Votre collection personnelle d\'histoires pour le coucher',
    emptyLibrary: 'Votre bibliothèque est vide. Créez votre première histoire !',
    chapters: 'chapitres',
    min: 'min',

    // Story Reader
    chapter: 'Chapitre',
    of: 'sur',
    previous: 'Précédent',
    next: 'Suivant',
    autoplayOn: 'Lecture automatique ON',
    autoplayOff: 'Lecture automatique OFF',
    resume: 'Reprendre',
    pause: 'Pause',
    reset: 'Réinitialiser',
    startReading: 'Commencer la Lecture',
    stopReading: 'Arrêter la Lecture',

    // Settings
    appSettings: 'Paramètres de l\'application',
    language: 'Langue',
    appearance: 'Apparence',
    speechSettings: 'Paramètres de voix',
    speechRate: 'Débit vocal',
    slow: 'Lent',
    normal: 'Normal',
    fast: 'Rapide',
    speechPitch: 'Tonalité vocale',
    low: 'Basse',
    high: 'Haute',
    about: 'À propos',
    version: 'Version',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    systemDefault: 'Paramètres système',
    support: 'Support & Aide',
    upgradeToPro: 'Passer à Pro',
    bestValue: 'MEILLEUR VALEUR',
    monthlyUnlimited: 'Ilimité Mensuel',
    active: 'Actif',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Histoires premium illimitées\n• Support prioritaire\n• Accès à toutes les fonctionnalités premium\n• Annuler à tout moment',
    twentyUsesPackage: 'Paquete de 20 Usos',
    twentyUsesPackageDescription: '• Obtén 20 historias premium\n• Sin compromiso mensual\n• Acceso a todas las características premium',

    // Purchase Modal
    chooseYourPlan: 'Choisissez votre plan',
    selectThePerfectPlanForYou: 'Sélectionnez le plan parfait pour vous',
    monthlyBilling: 'Mensuel',
    annualBilling: 'Annuel',
    processing: 'Traitement...',
    purchase: 'Acheter',
  },

  de: {
    // Common
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    success: 'Erfolg',
    error: 'Fehler',
    deleteConfirmation: 'Sind Sie sicher, dass Sie diese Geschichte löschen möchten?',
    deleteConfirmationMessage: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    loadingStory: 'Deine Geschichten werden geladen...',
    generatingStory: 'Deine Geschichte wird erstellt...',
    oops: 'Oops!',
    thisScreenDoesNotExist: 'Diese Seite existiert nicht.',
    goToHomeScreen: 'Zur Startseite!',
    yourFavorites: 'Ihre Lieblingsgeschichten:',

    // Tabs
    newStory: 'Neue Geschichte',
    myLibrary: 'Meine Bibliothek',
    settings: 'Einstellungen',

    // Story Creation
    createNewStory: 'Neue Geschichte erstellen',
    enterTitle: 'Geben Sie einen Titel ein...',
    storyTitleHint: 'Geben Sie einen Titel ein oder sprechen Sie, um Ihre Gutenachtgeschichte zu erstellen',
    exampleTitle: 'Versuchen Sie diese Beispiele:',
    storyPreview: 'Vorschau der Geschichte',
    startGeneration: 'Generierung starten',

    // Story Edit
    storyTitle: 'Titel der Geschichte',
    enterStoryTitle: 'Geben Sie einen Titel ein...',
    chapterNumber: 'Kapitel',
    chapterTitle: 'Titel des Kapitels',
    enterChapterTitle: 'Geben Sie einen Titel für dieses Kapitel ein...',
    chapterContent: 'Inhalt des Kapitels',
    enterChapterContent: 'Geben Sie den Inhalt für dieses Kapitel ein...',
    titleCannotBeEmpty: 'Der Titel kann nicht leer sein',
    storyUpdatedSuccessfully: 'Geschichte erfolgreich aktualisiert',
    failedToSaveChanges: 'Fehler beim Speichern der Änderungen',
    errorGettingStory: 'Fehler beim Laden der Geschichte. Bitte versuchen Sie es erneut.',

    // Story Settings
    storyLength: 'Länge der Geschichte',
    short: 'Kurz',
    medium: 'Mittel',
    long: 'Lang',
    ageRange: 'Altersbereich',
    years: 'Jahre',
    storyMood: 'Stimmung der Geschichte',
    happy: 'Fröhlich',
    adventurous: 'Abenteuerlich',
    educational: 'Lehrreich',
    calming: 'Beruhigend',
    magical: 'Magisch',

    // Library
    librarySubtitle: 'Ihre persönliche Sammlung von Geschichten',
    emptyLibrary: 'Ihre Bibliothek ist leer. Erstellen Sie Ihre erste Geschichte!',
    chapters: 'Kapitel',
    min: 'Min',

    // Story Reader
    chapter: 'Kapitel',
    of: 'von',
    previous: 'Vorheriges',
    next: 'Nächstes',
    autoplayOn: 'Automatische Wiedergabe AN',
    autoplayOff: 'Automatische Wiedergabe AUS',
    resume: 'Fortsetzen',
    pause: 'Pause',
    reset: 'Zurücksetzen',
    startReading: 'Vorlesen starten',
    stopReading: 'Vorlesen stoppen',

    // Settings
    appSettings: 'App-Einstellungen',
    language: 'Sprache',
    appearance: 'Erscheinungsbild',
    speechSettings: 'Spracheinstellungen',
    speechRate: 'Sprechgeschwindigkeit',
    slow: 'Langsam',
    normal: 'Normal',
    fast: 'Schnell',
    speechPitch: 'Tonhöhe',
    low: 'Tief',
    high: 'Hoch',
    about: 'Über',
    version: 'Version',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    systemDefault: 'Systemeinstellung',
    support: 'Support & Hilfe',
    upgradeToPro: 'Upgrade auf Pro',
    bestValue: 'BEST VALUE',
    monthlyUnlimited: 'Monatlich Unbegrenzt',
    active: 'Aktiv',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Premium-Geschichten unbegrenzt\n• Prioritärer Support\n• Zugang zu allen Premium-Funktionen\n• Jederzeit stornierbar',
    twentyUsesPackage: '20 Uses Package',
    twentyUsesPackageDescription: '• Get 20 premium stories\n• No monthly commitment\n• Access to all premium features',

    // Purchase Modal
    chooseYourPlan: 'Wählen Sie Ihren Plan',
    selectThePerfectPlanForYou: 'Wählen Sie den perfekten Plan für Sie',
    monthlyBilling: 'Monatlich',
    annualBilling: 'Jährlich',
    processing: 'Verarbeitung...',
    purchase: 'Kaufen',
  },

  it: {
    // Common
    save: 'Salva',
    cancel: 'Annulla',
    edit: 'Modifica',
    delete: 'Elimina',
    success: 'Successo',
    error: 'Errore',
    deleteConfirmation: 'Sei sicuro di voler eliminare questa storia?',
    deleteConfirmationMessage: 'Questa azione non può essere annullata.',
    loadingStory: 'Caricamento delle tue storie...',
    generatingStory: 'Creazione della tua storia...',
    oops: 'Oops!',
    thisScreenDoesNotExist: 'Questa pagina non esiste.',
    goToHomeScreen: 'Vai alla home!',
    yourFavorites: 'I tuoi Preferiti:',

    // Tabs
    newStory: 'Nuova Storia',
    myLibrary: 'La Mia Libreria',
    settings: 'Impostazioni',

    // Story Creation
    createNewStory: 'Crea una Nuova Storia',
    enterTitle: 'Inserisci un titolo per la storia...',
    storyTitleHint: 'Inserisci un titolo o parla per creare la tua storia della buonanotte',
    exampleTitle: 'Prova questi esempi:',
    storyPreview: 'Anteprima della storia',
    startGeneration: 'Inizia generazione',

    // Story Edit
    storyTitle: 'Titolo della storia',
    enterStoryTitle: 'Inserisci un titolo per la storia...',
    chapterNumber: 'Capitolo',
    chapterTitle: 'Titolo del capitolo',
    enterChapterTitle: 'Inserisci un titolo per questo capitolo...',
    chapterContent: 'Contenuto del capitolo',
    enterChapterContent: 'Inserisci il contenuto per questo capitolo...',
    titleCannotBeEmpty: 'Il titolo non può essere vuoto',
    storyUpdatedSuccessfully: 'Storia aggiornata con successo',
    failedToSaveChanges: 'Errore durante il salvataggio delle modifiche',
    errorGettingStory: 'Errore durante il caricamento della storia. Per favore, riprova.',

    // Story Settings
    storyLength: 'Lunghezza della storia',
    short: 'Breve',
    medium: 'Media',
    long: 'Lunga',
    ageRange: 'Fascia di età',
    years: 'anni',
    storyMood: 'Umore della storia',
    happy: 'Felice',
    adventurous: 'Avventuroso',
    educational: 'Educativo',
    calming: 'Calmante',
    magical: 'Magico',

    // Library
    librarySubtitle: 'La tua collezione personale di storie della buonanotte',
    emptyLibrary: 'La tua libreria è vuota. Crea la tua prima storia!',
    chapters: 'capitoli',
    min: 'min',

    // Story Reader
    chapter: 'Capitolo',
    of: 'di',
    previous: 'Precedente',
    next: 'Successivo',
    autoplayOn: 'Riproduzione automatica ON',
    autoplayOff: 'Riproduzione automatica OFF',
    resume: 'Riprendi',
    pause: 'Pausa',
    reset: 'Reimposta',
    startReading: 'Inizia Lettura',
    stopReading: 'Ferma Lettura',

    // Settings
    appSettings: 'Impostazioni dell\'app',
    language: 'Lingua',
    appearance: 'Aspetto',
    speechSettings: 'Impostazioni vocali',
    speechRate: 'Velocità della voce',
    slow: 'Lenta',
    normal: 'Normale',
    fast: 'Veloce',
    speechPitch: 'Tono della voce',
    low: 'Basso',
    high: 'Alto',
    about: 'Informazioni',
    version: 'Versione',
    privacyPolicy: 'Informativa sulla privacy',
    termsOfService: 'Termini di servizio',
    darkMode: 'Modalità scura',
    lightMode: 'Modalità chiara',
    systemDefault: 'Predefinito di sistema',
    support: 'Supporto & Assistenza',
    upgradeToPro: 'Passa a Pro',
    bestValue: 'VALORE OTTIMO',
    monthlyUnlimited: 'Mensile Illimitato',
    active: 'Attivo',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Storie premium illimitate\n• Supporto prioritario\n• Accesso a tutte le funzionalità premium\n• Annullare in qualsiasi momento',
    twentyUsesPackage: 'Paquete de 20 Usos',
    twentyUsesPackageDescription: '• Obtén 20 historias premium\n• Sin compromiso mensual\n• Acceso a todas las características premium',

    // Purchase Modal
    chooseYourPlan: 'Scegli il tuo piano',
    selectThePerfectPlanForYou: 'Seleziona il piano perfetto per te',
    monthlyBilling: 'Mensile',
    annualBilling: 'Annuale',
    processing: 'Elaborazione...',
    purchase: 'Acquista',
  },

  pt: {
    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    success: 'Sucesso',
    error: 'Erro',
    deleteConfirmation: 'Tem certeza de que deseja excluir esta história?',
    deleteConfirmationMessage: 'Esta ação não pode ser desfeita.',
    loadingStory: 'Carregando as suas histórias...',
    generatingStory: 'Criando a sua história...',
    errorGettingStory: 'Erro ao carregar a história. Por favor, tente novamente.',
    oops: 'Oops!',
    thisScreenDoesNotExist: 'Esta tela não existe.',
    goToHomeScreen: 'Vá para a tela inicial!',
    yourFavorites: 'Seus Favoritos:',

    // Tabs
    newStory: 'Nova História',
    myLibrary: 'Minha Biblioteca',
    settings: 'Configurações',

    // Story Creation
    createNewStory: 'Criar uma Nova História',
    enterTitle: 'Digite um título para a história...',
    storyTitleHint: 'Digite um título ou fale para criar sua história para dormir',
    exampleTitle: 'Experimente estes exemplos:',
    storyPreview: 'Prévia da história',
    startGeneration: 'Iniciar geração',

    // Story Edit
    storyTitle: 'Título da história',
    enterStoryTitle: 'Digite um título para a história...',
    chapterNumber: 'Capítulo',
    chapterTitle: 'Título do capítulo',
    enterChapterTitle: 'Digite um título para este capítulo...',
    chapterContent: 'Conteúdo do capítulo',
    enterChapterContent: 'Digite o conteúdo para este capítulo...',
    titleCannotBeEmpty: 'O título não pode estar vazio',
    storyUpdatedSuccessfully: 'História atualizada com sucesso',
    failedToSaveChanges: 'Erro ao salvar as alterações',

    // Story Settings
    storyLength: 'Duração da história',
    short: 'Curta',
    medium: 'Média',
    long: 'Longa',
    ageRange: 'Faixa etária',
    years: 'anos',
    storyMood: 'Clima da história',
    happy: 'Feliz',
    adventurous: 'Aventureiro',
    educational: 'Educativo',
    calming: 'Calmante',
    magical: 'Mágico',

    // Library
    librarySubtitle: 'Sua coleção pessoal de histórias para dormir',
    emptyLibrary: 'Sua biblioteca está vazia. Crie sua primeira história!',
    chapters: 'capítulos',
    min: 'min',

    // Story Reader
    chapter: 'Capítulo',
    of: 'de',
    previous: 'Anterior',
    next: 'Próximo',
    autoplayOn: 'Reprodução automática ATIVADA',
    autoplayOff: 'Reprodução automática DESATIVADA',
    resume: 'Retomar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    startReading: 'Iniciar Leitura',
    stopReading: 'Parar Leitura',

    // Settings
    appSettings: 'Configurações do aplicativo',
    language: 'Idioma',
    appearance: 'Aparência',
    speechSettings: 'Configurações de voz',
    speechRate: 'Velocidade da fala',
    slow: 'Lenta',
    normal: 'Normal',
    fast: 'Rápida',
    speechPitch: 'Tom de voz',
    low: 'Baixo',
    high: 'Alto',
    about: 'Sobre',
    version: 'Versão',
    privacyPolicy: 'Política de privacidade',
    termsOfService: 'Termos de serviço',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
    systemDefault: 'Padrão do sistema',
    support: 'Suporte & Ajuda',
    upgradeToPro: 'Atualizar para Pro',
    bestValue: 'VALOR OTIMO',
    monthlyUnlimited: 'Mensal Ilimitado',
    active: 'Ativo',
    monthlyPrice: '$14.99/month',
    monthlyUnlimitedDescription: '• Histórias premium ilimitadas\n• Suporte prioritário\n• Acesso a todas as funcionalidades premium\n• Cancelar em qualquer momento',
    twentyUsesPackage: 'Paquete de 20 Usos',
    twentyUsesPackageDescription: '• Obtén 20 historias premium\n• Sin compromiso mensual\n• Acceso a todas las características premium',

    // Purchase Modal
    chooseYourPlan: 'Escolha seu plano',
    selectThePerfectPlanForYou: 'Selecione o plano perfeito para você',
    monthlyBilling: 'Mensal',
    annualBilling: 'Anual',
    processing: 'Processando...',
    purchase: 'Comprar',
  },
};

export const getTranslations = (langCode: string) => {
  return translations[langCode as keyof typeof translations] || translations.en;
};

export const getSpeechLocale = (langCode: string): string => {
  // Map language codes to speech-compatible locales
  const speechLocales: Record<string, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    pt: 'pt-PT',
  };

  return speechLocales[langCode] || 'en-US';
};