/**
 * Données statiques pour la démo
 */

import type { BulletinData, ActionItem, DemarcheItem } from '../types';

export const STATIC_BULLETINS: BulletinData[] = [
  {
    id: '1',
    title: 'Bulletin de Solde - Octobre 2024',
    period: 'Octobre 2024',
    net: '450,000',
    issued_at: '2024-10-30',
    currency: 'XAF'
  },
  {
    id: '2',
    title: 'Bulletin de Solde - Septembre 2024',
    period: 'Septembre 2024',
    net: '450,000',
    issued_at: '2024-09-30',
    currency: 'XAF'
  },
  {
    id: '3',
    title: 'Bulletin de Solde - Août 2024',
    period: 'Août 2024',
    net: '448,500',
    issued_at: '2024-08-31',
    currency: 'XAF'
  },
  {
    id: '4',
    title: 'Bulletin de Solde - Juillet 2024',
    period: 'Juillet 2024',
    net: '450,000',
    issued_at: '2024-07-30',
    currency: 'XAF'
  },
  {
    id: '5',
    title: 'Bulletin de Solde - Juin 2024',
    period: 'Juin 2024',
    net: '447,200',
    issued_at: '2024-06-30',
    currency: 'XAF'
  },
  {
    id: '6',
    title: 'Bulletin de Solde - Mai 2024',
    period: 'Mai 2024',
    net: '450,000',
    issued_at: '2024-05-31',
    currency: 'XAF'
  },
  {
    id: '7',
    title: 'Bulletin de Solde - Avril 2024',
    period: 'Avril 2024',
    net: '449,800',
    issued_at: '2024-04-30',
    currency: 'XAF'
  },
  {
    id: '8',
    title: 'Bulletin de Solde - Mars 2024',
    period: 'Mars 2024',
    net: '450,000',
    issued_at: '2024-03-31',
    currency: 'XAF'
  },
  {
    id: '9',
    title: 'Bulletin de Solde - Février 2024',
    period: 'Février 2024',
    net: '445,500',
    issued_at: '2024-02-29',
    currency: 'XAF'
  },
  {
    id: '10',
    title: 'Bulletin de Solde - Janvier 2024',
    period: 'Janvier 2024',
    net: '450,000',
    issued_at: '2024-01-31',
    currency: 'XAF'
  }
];

export const STATIC_ACTIONS: ActionItem[] = [
  { id: '1', title: "Demande de congé annuel", date: "2024-10-15" },
  { id: '2', title: "Demande d'attestation de travail", date: "2024-09-28" },
  { id: '3', title: "Déclaration de changement d'adresse", date: "2024-08-12" }
];

export const STATIC_DEMARCHES: DemarcheItem[] = [
  { id: '1', title: "Guide de remplissage du formulaire de congé" },
  { id: '2', title: "Procédure de demande d'allocations familiales" },
  { id: '3', title: "Guide de déclaration de situation matrimoniale" }
];

export const RAPPELS_LIST: string[] = [
  "Rappels d'activités",
  "Rappels d'allocations Familiales",
  "Rappel de promotion",
  "Rappel d'avancement",
  "Rappel de promotion sur liste d'aptitude",
  "Rappel de reclassement (Rappel de reconstitution de carrière)",
  "Rappel de révision de situation administrative",
  "Rappel de titularisation",
  "Rappel de reversement",
  "Rappel de remboursement",
  "Rappel de remboursement IRPP.",
  "Rappel de réalignement ou suspension",
  "Rappel Radiation",
  "Rappel de levée de mesure",
  "Rappel agent code 90 réhabilité",
  "Rappel disponibilité",
  "Rappel retraite (Indemnité de Fin de Carrière)",
  "Rappel retraite (Congé payé)",
  "Rappel décès (Capital décès)",
  "Rappel décès (Congé payé).",
  "Rappel de nomination",
  "Rappel de congé diplomatique",
  "Rappel de mise équipement",
  "Rappel de congé de rapatriement",
  "Rappel indemnité de représentation.",
  "Rappel indemnités et primes",
  "Rappel de mise équipement",
  "Rappel d'affectation (civils)",
  "Rappel d'indemnité de logement"
];

export const ALLOCATIONS_LIST: string[] = ["Demande d'allocations familiales"];

export const MATRIMONIALES_LIST: string[] = ["Déclaration de situation matrimoniale"];
