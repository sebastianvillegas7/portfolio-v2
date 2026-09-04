# Primer arranque en Windows

Desde PowerShell, dentro de la carpeta `portfolio-v2`:

```powershell
node -v
npm -v
npm install
npm run dev
```

Luego abrir:

```text
http://localhost:3000
```

## Si `node -v` es menor a 20.9

Actualizar Node.js antes de instalar dependencias. Se recomienda una versión LTS actual.

## Comprobar que todo está correcto

```powershell
npm run lint
npm run build
```

## Añadir componentes shadcn más adelante

La configuración ya existe en `components.json`. Por ejemplo:

```powershell
npx shadcn@latest add card
```

No hace falta ejecutar `shadcn init` nuevamente.
