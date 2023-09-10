import React, { useState } from 'react';
import './instrucciones.css'

function Instructions() {
  const [variable, setStepVisibility] = useState({}); 
  /*variable almacena la info de si está visible o no, y setStepVisibility es la función que ocupa el hook "useState" para actualizar el valor*/
  
  //La función y el texto creado con ayuda de ChatGPT adecuado al contexto del proyecto
  // Función para alternar la visibilidad de un paso. 
  const toggleStepVisibility = (step) => {
    setStepVisibility((visibilidad) => ({...visibilidad,[step]: !visibilidad[step],}));
  };

  return (
    <div className="instructions-page">
      <h1>Instrucciones del Planner Deportivo</h1>
      <p>
        ¡Bienvenido a nuestro Planner Deportivo! Aquí tienes una guía rápida
        sobre cómo utilizarlo para mejorar tu rutina de ejercicio y mantenerte
        activo y saludable.
      </p>
      {/* Paso 1 */}
      <div className={`step ${variable.step1 ? 'active' : ''}`}> {/* si step1 es true, retorna active, sino nada */}
        <h2 onClick={() => toggleStepVisibility('step1')}>
          Paso 1: Escoge un plan
        </h2>
        {variable.step1 && (
          <>
            <p>
            - Define tus objetivos de entrenamiento, como perder peso, ganar masa
            muscular o mantener tu estado físico actual.
            </p>
            <p>
              - Debes escoger entre una serie de opciones.
            </p>
          </>
        )}
      </div>
      {/* Paso 2 */}
      <div className={`step ${variable.step2 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step2')}>
          Paso 2: Ingresa tu Perfil de Usuario
        </h2>
        {variable.step2 && (
          <p>
            - Completa tu perfil de usuario con información básica, como por ejemplo tu nombre y
            edad. Esto nos ayudará a personalizar tus recomendaciones.
          </p>
        )}
      </div>


      {/* Paso 3 */}
      <div className={`step ${variable.step4 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step4')}>
          Paso 3: Crear una Rutina de Ejercicio
        </h2>
        {variable.step4 && (
          <>
            <p>
              - Ve a la sección "Crear Rutina".
            </p>
            <p>
              - Selecciona el tipo de ejercicio que deseas realizar, como cardio,
              fuerza, yoga, etc.
            </p>
            <p>
              - Establece la duración y la frecuencia de tus entrenamientos (por
              ejemplo, 30 minutos al día, 3 veces por semana).
            </p>
          </>
        )}
      </div>

      {/* Paso 4 */}
      <div className={`step ${variable.step5 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step5')}>
          Paso 4: Programar tus Entrenamientos
        </h2>
        {variable.step5 && (
          <p>
            - Selecciona los días y horarios en los que te gustaría realizar tus
            entrenamientos. Puedes ser tan flexible como desees.
          </p>
        )}
      </div>

      {/* Paso 5 */}
      <div className={`step ${variable.step6 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step6')}>
          Paso 5: Consulta tu Planner
        </h2>
        {variable.step6 && (
          <>
            <p>
              - Ve a la sección "Mi Planner".
            </p>
            <p>
              - Verás tus entrenamientos programados para cada día.
            </p>
            <p>
              - Haz clic en cada entrenamiento para obtener detalles, como ejercicios
              específicos y duración.
            </p>
          </>
        )}
      </div>

      {/* Paso 6 */}
      <div className={`step ${variable.step7 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step7')}>
          Paso 6: Iniciar tu Entrenamiento
        </h2>
        {variable.step7 && (
          <>
            <p>
              - Llegado el momento programado, prepárate para tu entrenamiento. Serás recordado mediante notificaciones
            </p>
            <p>
              - Sigue las instrucciones y los ejercicios en tu rutina.
            </p>
            <p>
              - Marca como completados los entrenamientos una vez que los hayas
              finalizado.
            </p>
          </>
        )}
      </div>

      {/* Paso 7 */}
      <div className={`step ${variable.step8 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step8')}>
          Paso 7: Seguimiento y Progreso
        </h2>
        {variable.step8 && (
          <>
            <p>
              - Registra tu progreso, como el tiempo que dedicaste, las calorías
              quemadas o las repeticiones realizadas.
            </p>
            <p>
              - Consulta tus estadísticas y avances en tu perfil de usuario.
            </p>
          </>
        )}
      </div>

      {/* Paso 8 */}
      <div className={`step ${variable.step9 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step9')}>
          Paso 8: Ajustar tu Rutina
        </h2>
        {variable.step9 && (
          <>
            <p>
              - Si sientes que tu rutina actual es demasiado fácil o demasiado
              difícil, ajústala en la sección "Editar Rutina" que aparecerá en el planner.
            </p>
            <p>
              - Puedes cambiar la duración, la intensidad o los ejercicios según tus
              necesidades.
            </p>
          </>
        )}
      </div>

      {/* Paso 9 */}
      <div className={`step ${variable.step10 ? 'active' : ''}`}>
        <h2 onClick={() => toggleStepVisibility('step10')}>
          Paso 9: Mantente Motivado/a
        </h2>
        {variable.step10 && (
          <>
            <p>
              - Mantén un registro de tus logros y objetivos cumplidos.
            </p>
            <p>
              - Únete a desafíos o competencias si están disponibles en nuestro sitio
              web.
            </p>
            <p>
              - ¡Disfruta de tu viaje hacia una vida más activa y saludable!
            </p>
          </>
        )}
      </div>
      


    </div>
  );
  }

  export default Instructions;