import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { loadHolidays } from './services/holidayService';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


export class HolidayCalendar implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private holidays: Date[] = [];
    private notifyOutputChanged: () => void;
    private currentDate: Date = new Date();

    public async init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.container = container;
        this.notifyOutputChanged = notifyOutputChanged;

        const holidayListJson = context.parameters.HolidayList?.raw || "[]";
        this.holidays = await loadHolidays(holidayListJson);

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'calendar-input';
        container.appendChild(input);

        flatpickr(input, {
            disable: this.holidays.map(date => date.toISOString().split('T')[0]),
            dateFormat: "Y-m-d",
            minDate: "today",
            onChange: (selectedDates, dateStr) => {
                console.log(`Selected date: ${dateStr}`);
            }
        });
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
     
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

    }

    private renderCalendar() {
        this.container.innerHTML = '';

        const header = this.renderHeader();
        const dayNames = this.renderDayNames();
        const days = this.renderDays();

        this.container.appendChild(header);
        this.container.appendChild(dayNames);
        this.container.appendChild(days);
    }

    private renderHeader(): HTMLElement {
        const header = document.createElement('div');
        header.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.onclick = () => this.moveMonth(-1);

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.onclick = () => this.moveMonth(1);

        const monthYear = document.createElement('span');
        monthYear.textContent = `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`;
        monthYear.className = 'month-year';

        header.appendChild(prevButton);
        header.appendChild(monthYear);
        header.appendChild(nextButton);

        return header;
    }

    private renderDayNames(): HTMLElement {
        const dayNamesRow = document.createElement('div');
        dayNamesRow.className = 'calendar-day-names';

        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        days.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'day-name';
            dayEl.textContent = day;
            dayNamesRow.appendChild(dayEl);
        });

        return dayNamesRow;
    }

    private renderDays(): HTMLElement {
        const daysContainer = document.createElement('div');
        daysContainer.className = 'calendar-days';

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        let startDay = firstDay.getDay(); // Domingo=0, Lunes=1...

        if (startDay === 0) {
            startDay = 7; // Ajustar para que Lunes sea primero
        }

        // Rellenar días en blanco antes del 1ro
        for (let i = 1; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            daysContainer.appendChild(emptyCell);
        }

        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('button');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day.toString();

            const fullDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

            if (this.isHoliday(fullDate)) {
                dayCell.disabled = true;
                dayCell.classList.add('holiday');
            } else {
                dayCell.onclick = () => {
                    console.log(`Selected: ${fullDate.toISOString()}`);
                };
            }

            daysContainer.appendChild(dayCell);
        }

        return daysContainer;
    }

    private moveMonth(delta: number) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    private isHoliday(date: Date): boolean {
        return this.holidays.some(h =>
            h.getFullYear() === date.getFullYear() &&
            h.getMonth() === date.getMonth() &&
            h.getDate() === date.getDate()
        );
    }
}
