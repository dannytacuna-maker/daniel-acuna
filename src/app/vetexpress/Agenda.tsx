"use client";

import { FormEvent, useMemo, useState } from "react";
import { PhoneIcon } from "./Icons";

const WHATSAPP = "50379252537";

const services = [
  "Consulta a domicilio",
  "Consulta en clínica",
  "Vacunación y desparasitación",
  "Baño y peluquería",
  "Farmacia / productos",
  "Guardería y hospedaje",
  "Laboratorio",
  "Transporte de mascota",
  "Trámites de exportación",
  "Otro",
];

const zones = ["Santa Tecla", "Merliot", "Clínica Santa Mónica", "Otra zona (coordinar)"];

export function Agenda() {
  const [name, setName] = useState("");
  const [pet, setPet] = useState("");
  const [service, setService] = useState(services[0]);
  const [zone, setZone] = useState(zones[0]);
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");

  const href = useMemo(() => {
    const lines = [
      "Hola VETEXPRESS, quiero agendar:",
      name ? `Nombre: ${name}` : null,
      pet ? `Mascota: ${pet}` : null,
      `Servicio: ${service}`,
      `Zona / lugar: ${zone}`,
      when ? `Día preferido: ${when}` : null,
      note ? `Notas: ${note}` : null,
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [name, pet, service, zone, when, note]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="vx-form" onSubmit={onSubmit}>
      <label className="vx-field">
        <span>Tu nombre</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label className="vx-field">
        <span>Mascota</span>
        <input
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          placeholder="Luna, gata · o Toby, perro"
        />
      </label>
      <label className="vx-field">
        <span>Servicio</span>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="vx-field">
        <span>Zona</span>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {zones.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="vx-field">
        <span>Día preferido</span>
        <input value={when} onChange={(e) => setWhen(e.target.value)} placeholder="Ej. sábado en la mañana" />
      </label>
      <label className="vx-field">
        <span>Notas</span>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <button className="vx-btn vx-btn-gold" type="submit">
        <PhoneIcon />
        Enviar cita
      </button>
    </form>
  );
}
