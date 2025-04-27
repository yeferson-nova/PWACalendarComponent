# PWACalendarComponent

🗓️ **PWACalendarComponent** es un componente personalizado desarrollado con **PowerApps Component Framework (PCF)**, diseñado para ofrecer un control de calendario desplegable que permite bloquear días festivos dinámicamente.

## ✨ Funcionalidades principales

- Mostrar un calendario estilo "datepicker" moderno y responsivo.
- Bloquear automáticamente días festivos (definidos vía JSON, SharePoint, SQL u otras fuentes).
- Navegar fácilmente entre meses y años.
- Permitir únicamente la selección de días hábiles.
- Estética limpia y adaptable (compatible con Fluent UI).
- Fácil integración en formularios de PowerApps basados en Dataverse.

## 🚀 Tecnologías utilizadas

- [Power Apps Component Framework (PCF)](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [TypeScript](https://www.typescriptlang.org/)
- [Flatpickr](https://flatpickr.js.org/) (librería de calendario ligero)
- HTML / CSS básico

## 📦 Instalación y empaquetado

### 1. Clonar el repositorio

```bash
git clone https://github.com/yeferson-nova/PWACalendarComponent.git
cd PWACalendarComponent
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Inicializar la solución

Crear una carpeta de solución, moverte a ella e inicializarla:

```bash
mkdir solution
cd solution
pac solution init --publisher-name "ContosoPublisher" --publisher-prefix "ctsp"
```

### 4. Agregar referencia del componente a la solución

Desde la carpeta `solution`, agrega referencia al proyecto PCF:

```bash
pac solution add-reference --path ..\HolidayCalendar
```

*(Asegúrate de que `HolidayCalendar.pcfproj` esté correctamente configurado.)*

### 5. Crear el archivo Customizations.xml

Dentro de la carpeta `Other/`, crea el archivo `Customizations.xml` con este contenido mínimo:

```xml
<ImportExportXml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Entities />
  <Roles />
  <Workflows />
  <FieldSecurityProfiles />
  <Templates />
  <EntityMaps />
  <EntityRelationships />
  <OrganizationSettings />
  <Languages />
  <Optionsets />
  <CustomControls />
</ImportExportXml>
```

Guarda el archivo en la carpeta `solution/Other/`.

### 6. Empaquetar la solución

Desde la carpeta `solution/`, empaqueta el proyecto para generar el archivo `.zip`:

```bash
pac solution pack --zipfile ./bin/debug/solution.zip --folder . --packagetype Both
```

Esto generará los archivos:

- `solution.zip` (solución no administrada)
- `solution_managed.zip` (solución administrada)

dentro de `solution/bin/debug/`.

### 7. Importar en Power Apps

- Accede a [https://make.powerapps.com/](https://make.powerapps.com/).
- Selecciona tu entorno de Dataverse.
- Ve a **Soluciones** → **Importar solución**.
- Carga el archivo `solution.zip`.

✅ Tu control estará disponible para ser usado en formularios de Dataverse.

## 🛠️ Configuración de parámetros

| Parámetro     | Descripción                                                                 |
|:--------------|:----------------------------------------------------------------------------|
| `HolidayList` | Lista de días festivos en formato JSON. Ejemplo: `["2025-01-01", "2025-03-24"]` |

---

## 🖼️ Vista previa

![image](https://github.com/user-attachments/assets/76d4c059-7cb5-4868-9230-98c08f9d747c)


---

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

## ✍️ Autor

- **Yeferson Nova** - [LinkedIn](https://www.linkedin.com/in/yeferson-nova/)
- Proyecto disponible en [https://github.com/yeferson-nova/PWACalendarComponent](https://github.com/yeferson-nova/PWACalendarComponent)
